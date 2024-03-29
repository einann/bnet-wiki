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
                wiki.TSDATA_PARSED = b64DecodeUnicode(wiki.TSDATA);
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
            wiki.TSDATA_PARSED = b64DecodeUnicode(wiki.TSDATA);
            wiki.Child = getTreeItems(wiki.TSID)
            arr.push(wiki)
        }
    }
    return calculateTreeIndex(arr);
}

export const calculateTreeIndex = (data: WikiRawDataType[], parentTreeIndex = 0, subTabOpen?: boolean) => {
    data.forEach(item => {
        if (item.MTID === " " || subTabOpen) {
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
    let decodedString = decodeURIComponent(decodeURIComponent(atob(str)).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    decodedString = decodedString.replace("<head>", "");
    decodedString = decodedString.replace("</head>", "");
    decodedString = decodedString.replace("<body>", "");
    decodedString = decodedString.replace("</body>", "");
    return decodedString;
}


export const urlParse = (value: string, grup?: string, type?: string, lover?: string) => {
    var dizi: any[] = [];
    if (!value) return [{
        propertyName: "",
        operation: "EQ",
        propertyValue: "",
        conversionMethodName: "",
        group: "",
        tableObject: "",
    }];
    var param = value.split('&');
    param.forEach(function (row, index) {
        if (row.indexOf("=") > 0) {
            var value = row.split('=');
            dizi.push({
                propertyName: value[0],
                operation: value[1].split(",").length > 1 ? "IN" : "EQ",
                propertyValue: value[1]
            })
        } else if (row.indexOf("<") > 0) {
            var value = row.split('<');
            dizi.push({
                propertyName: value[0],
                operation: "LT",
                propertyValue: value[1]
            })
        } else if (row.indexOf(">") > 0) {
            var value = row.split('>');
            dizi.push({
                propertyName: value[0],
                operation: "GT",
                propertyValue: value[1]
            })
        } else if (row.indexOf("%") > 0) {
            var value = row.split('%');
            dizi.push({
                propertyName: value[0],
                operation: "CT",
                propertyValue: value[1]
            })
        } else if (row.indexOf("!") > 0) {
            var value = row.split('!');
            dizi.push({
                propertyName: value[0],
                operation: "NE",
                propertyValue: value[1]
            })
        }
        if (grup) dizi[index].group = grup;
        else dizi[index].group = "";
        if (lover) dizi[index].conversionMethodName = lover;
        else dizi[index].conversionMethodName = "";
        dizi[index].tableObject = "";

    })
    return dizi;
}