import moment from "moment";
import pako from "pako";

const authorization = "bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkxBOHREZ19EeFNTQW5VS0o4bkphT0Y3anBrckMzQUExZXhsRkNHU1pKMnMiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI2ZjEwMDkzMS1hNGMyLTQ3NWItYTE1OC1hZmZkOWJhMzU4MzEiLCJzdWIiOiIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJCUyIsImFjciI6IjEiLCJlbWFpbCI6Imhhc2FuLmFrcG9sYWRAZGV0YXlzb2Z0LmNvbSIsIm5hbWUiOiJIQVNBTiBBS1BPTEFEIiwiZ2l2ZW5fbmFtZSI6IkhBU0FOIiwiZmFtaWx5X25hbWUiOiJBS1BPTEFEIiwic2Vzc2lvbl9zdGF0ZSI6Ijk0MDgyN2U2LWRmNWYtNDA4ZC04MWRhLWFlMGM2YTZjNDJiYSIsImNsaWQiOiIxMDAiLCJzeWlkIjoiQlMiLCJicGlkIjoiMDAwMDE4NjQiLCJwYXNzd29yZF9yZXNldCI6ZmFsc2UsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMDAwMDE4NjQiLCJuYmYiOjE3MDU0OTc3NzksImV4cCI6MTcwNTU4NDE3OSwiaXNzIjoiaHR0cHM6Ly9ibmV0LmRldGF5c29mdC5jb21yZWFsbXMvMTAwIiwiYXVkIjoiYWNjb3VudCJ9.Pm9-pxDSAqCumzANizMy-grF3UUVT6sjIUu7jSKH_XyBnhJbefMAlnQ0VV-YjGcfM05KAfYlM1aMDy10DhbytLsMwtPLuqE8cQV1g_4-Y0S_wOCU7KSvyblwcCM0ZQU3i_QjFA3Dale49s_egQ7mct72gDsz068IXWjWqvieSfpoRPXV7sKhOWVmOz6DAxkoytM62IIqMjYj0oiQEuqK2piTvFXoYDDrqW6-oXJ6tikXeSAb2Urn2bCE-S9l8LtcaLLEI4cCA1ytuElXZSG3iseVvJWOg49miLvDpiwqh78B822UAiosmjVKgHe_VN7dUj8D9f5GnFNA9bE58SxnUA";
const getUrl = "https://ses.detayteknoloji.com/ses_api/bktasks";
const otherUrl = "https://ses.detayteknoloji.com/ses_api/bktask";

export const addWiki = async (payload: any[]) => {
    const fullPayload = addRequiredFields(payload);
    const res = await fetch(otherUrl, {
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
        console.log(decodedData);
    }
    else {
        return false;
    }
}


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
    const res = await fetch(getUrl, {
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