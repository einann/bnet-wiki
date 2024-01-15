import moment from "moment";
import { WikiRawDataType } from "../types/wikidata.types";

export const buildWikiTree = (data: WikiRawDataType[], id = " ") => {
    var arr = [];
    var getTreeItems = function (tsid: string) {
        var items: WikiRawDataType[] = [];
        data.forEach(wiki => {
            if (wiki.MTID === tsid) {
                wiki.CRDT_PARSED = genericDateFormat(wiki.CRDT, "DD MMM YYYY");
                wiki.CRTM_PARSED = genericTimeFormat(wiki.CRTM);
                wiki.MESSAGE_PARSED = b64DecodeUnicode(wiki.MESSAGE);
                wiki.SQNR = parseInt(wiki.SQNR).toString()
                wiki.Child = getTreeItems(wiki.TSID)
                items.push(wiki)
            }
        })
        return items;
    };
    for (let wiki of data) {
        var Child = data.filter(x => x.TSID == wiki.MTID);
        var tMtid = Child.length ? id : wiki.MTID
        if (wiki.MTID == tMtid) {
            wiki.CRDT_PARSED = genericDateFormat(wiki.CRDT, "DD MMM YYYY");
            wiki.CRTM_PARSED = genericTimeFormat(wiki.CRTM);
            wiki.MESSAGE_PARSED = b64DecodeUnicode(wiki.MESSAGE);
            wiki.Child = getTreeItems(wiki.TSID)
            arr.push(wiki)
        }
    }
    return calculateTreeIndex(arr);
}

const calculateTreeIndex = (data: WikiRawDataType[], parentTreeIndex = 0) => {
    data.forEach(item => {
        if (item.MTID === " ") {
            item.TREE_INDEX = 0;
        } else {
            item.TREE_INDEX = parentTreeIndex + 1;
        }
        if (item.Child && item.Child.length > 0) {
            calculateTreeIndex(item.Child, item.TREE_INDEX);
        }
    });
    return data;
}

export const toUpperCaseByTurkish = (query: string) => {
    const letters: any = {
        "i": "İ",
        "ş": "Ş",
        "ğ": "Ğ",
        "ü": "Ü",
        "ö": "Ö",
        "ç": "Ç",
        "ı": "I",
        "j": "J"
    };
    query = query.replace(/(([iışğüçö]))/g, function (letter) {
        return letters[letter];
    })
    return query.toUpperCase();
}


export const findTsidOnSearchQuery = (allData: WikiRawDataType[], rawData: WikiRawDataType[], query: string, result: any[]) => {
    allData.forEach(item => {
        if (toUpperCaseByTurkish(item.TSNM).match(query)) {
            result.push(item);
            const master = rawData.find(x => x.TSID === item.MTID);
            if (master) {
                const alreadyPushed = result.find(x => x.TSID === master.TSID);
                if (!alreadyPushed) result.push(master);
            }
        }
        if (item.Child) {
            findTsidOnSearchQuery(item.Child, rawData, query, result);
        }
    })
    return result;
}


const genericDateFormat = (date: string, format: string) => {
    if (format) date = moment(date, "YYYYMMD").format(format);
    else date = moment(date, "YYYYMMD").format("DD.MM.YYYY");
    return date.includes("Invalid") ? "" : date;
}

const genericTimeFormat = (date: string, format?: string) => {
    if (format) date = moment(date, "hmmss").format(format);
    else date = moment(date, "hmm").format("HH:mm");
    return date.includes("Invalid") ? "" : date;
}

export const b64DecodeUnicode = (str: string) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    let decodedString = decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    decodedString = decodedString.replace("<head>", "");
    decodedString = decodedString.replace("</head>", "");
    decodedString = decodedString.replace("<body>", "");
    decodedString = decodedString.replace("</body>", "");
    return decodedString;
}