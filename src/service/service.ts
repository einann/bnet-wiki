import moment from "moment";
import pako from "pako";

const authorization = "";
const GET_WIKI_URL = "https://ses.detayteknoloji.com/ses_api/bktasks";
const OTHER_WIKI_URL = "https://ses.detayteknoloji.com/ses_api/bktask";
const GET_FILE_URL = "https://ses.detayteknoloji.com/ses_api/bkdocuments";
const OTHER_FILE_URL = "https://ses.detayteknoloji.com/ses_api/bkdocument";
const STREAM_FILE_URL = "https://ses.detayteknoloji.com/ses_api/stream";

export const getWiki = async (
    filter: any,
    dto?: string,
    filterCompareType?: "AND" | "OR",
    skip?: number,
    take?: number,
    sort?: any[],
    filterCompareTypes?: any[],
    getLayout?: true | false,
    layoutLanguage?: string
) => {
    const payload = createGetPayloadObject(filter, dto, filterCompareType, skip, take, sort, filterCompareTypes, getLayout, layoutLanguage);
    const res = await fetch(GET_WIKI_URL, {
        method: "POST",
        headers: {
            'Authorization': authorization,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);
        return decodedData;
    }
    else {
        return false;
    }
}

export const addWiki = async (payload: any[]) => {
    const fullPayload = addRequiredFields(payload);
    const res = await fetch(OTHER_WIKI_URL, {
        method: "POST",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fullPayload)
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData.Status) {
            return decodedData.Data;
        }
        else return false;
    }
    else {
        return false;
    }
}

export const updateWiki = async (payload: any[]) => {
    const fixedPayload = fixFields(payload);
    const res = await fetch(OTHER_WIKI_URL, {
        method: "PUT",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fixedPayload)
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData.Status) {
            return decodeResponse(decodedData.Data);
        }
        else return false;
    }
    else {
        return false;
    }
}

export const delWiki = async (payload: string[]) => {
    const res = await fetch(OTHER_WIKI_URL, {
        method: "DELETE",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData.Status) {
            return decodedData.Data;
        }
        else return false;
    }
    else {
        return false;
    }
}

export const getWikiFile = async (
    filter: any,
    dto?: string,
    filterCompareType?: "AND" | "OR",
    skip?: number,
    take?: number,
    sort?: any[],
    filterCompareTypes?: any[],
    getLayout?: true | false,
    layoutLanguage?: string
) => {
    const payload = createGetPayloadObject(filter, dto, filterCompareType, skip, take, sort, filterCompareTypes, getLayout, layoutLanguage);
    const res = await fetch(GET_FILE_URL, {
        method: "POST",
        headers: {
            'Authorization': authorization,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);
        return decodedData;
    }
    else {
        return false;
    }
}

export const addWikiFile = async (payload: any) => {
    const res = await fetch(OTHER_FILE_URL, {
        method: "POST",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData.Status) {
            return decodedData.Data;
        }
        else return false;
    }
    else {
        return false;
    }
}


export const delWikiFile = async (payload: string[]) => {
    const res = await fetch(OTHER_FILE_URL, {
        method: "DELETE",
        headers: {
            "Authorization": authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData.Status) {
            return decodedData.Data;
        }
        else return false;
    }
    else {
        return false;
    }
}


export const addStream = async (payload: any, fileName: string) => {
    const formData = new FormData();
    formData.append("fileData", payload);

    const res = await fetch(STREAM_FILE_URL, {
        method: "POST",
        headers: {
            "Authorization": authorization,
        },
        body: formData,
    });

    if (res.ok) {
        const textResponse = await res.text();
        const decodedData = decodeResponse(textResponse);

        if (decodedData) {
            return {
                fileData: decodedData,
                fileName: fileName,
            };
        }
        else return false;
    }
    else {
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const decodeResponse = (response: string) => {
    const compressedData = Uint8Array.from(atob(response), (c) => c.charCodeAt(0));
    const decompressedData = pako.inflateRaw(compressedData, { to: "string" });
    const parsed = JSON.parse(decompressedData);
    return parsed;
}


const createGetPayloadObject = (
    filter: any,
    dto?: string,
    filterCompareType?: "AND" | "OR",
    skip?: number,
    take?: number,
    sort?: any[],
    filterCompareTypes?: any[],
    getLayout?: true | false,
    layoutLanguage?: string
) => {
    return {
        filter,
        filterCompareType: filterCompareType || "AND",
        returnDtoType: dto || "",
        skipCount: skip || 0,
        takeCount: take || 0,
        sort: sort || [],
        filterCompareTypes: filterCompareTypes || [{ group: "GP", type: "OR" }],
        getLayout: getLayout || false,
        layoutLanguage: layoutLanguage || "TR",
    }
}

const addRequiredFields = (payload: any[]) => {
    payload.forEach(item => {
        item.ENDDT = item.ENDDT || moment().format("YYYYMMDD");
        item.RPBP = "00001864"; // düzenlenecek, user'dan alınacak
        item.SQNR = "0";
        item.STIT = "X";
        item.TTID = "";
    });
    return payload;
}

const fixFields = (payload: any[]) => {
    payload.forEach(item => {
        delete item.Child;
        item.CHUS = item.CHUS && item.CHUS.BPID ? item.CHUS.BPID : "00002027";  // düzenlenecek
        item.CRUS = item.CRUS && item.CRUS.BPID ? item.CRUS.BPID : "00002027";  // düzenlenecek
        item.RPBP = item.RPBP && item.RPBP.BPID ? item.RPBP.BPID : "00002027";  // düzenlenecek
    });
    return payload;
}