type PersonnelInfoType = {
    CLID: string;
    BPID: string;
    BPNM: string;
    USNM: string;
    BPTP: string;
    CPTP: string;
    ACTIVE: ' ' | 'X';
    BMAIL: string;
    PMAIL: string;
    OOJID: string;
    OOJNM: string;
    SOJNM: string;
}


export type PRSTValuesType = '0' | '1' | '2' | '3' | '4' | 'C' | 'A' | 'R' | 'D' | 'P';

export type PRSTDomainModelType = {
    ACTIVE: string;
    DOMNM: '/BNT/PRST';
    DOMVL: PRSTValuesType;
    DOMVLSQ: string;
    DOMVLTX: string;
    LANG: null | string;
}

export type WikiTaskDataType = ' ' | 'T' | 'S';

export type FileDataType = {
    BKID: string;
    BKTP: string;
    CHDT: string;
    CHTM: string;
    CHUS: PersonnelInfoType;
    CLID: string;
    CRDT: string;
    CRTM: string;
    CRUS: PersonnelInfoType;
    DCDATA: {
        CLID: string | null;
        DCID: string | null;
        DCDATA: string | null;
    };
    DCID: string;
    DCNM: string;
    DCSIZE: null | string | number;
    DCST: string;
    DCTP: string;
    DataBase64: string;
    StreamFile: {
        DisplayName: null | string;
        Extension: string;
        FileName: string;
    }
}

export type WikiRawDataType = {
    Child: WikiRawDataType[] | [];
    CLID: string;
    TSID: string;
    TSNM: string;
    TSTP: ' ' | 'T' | 'S';
    TSST: PRSTValuesType;
    TSSTCLR: string | undefined;
    BKTP: string;
    BKID: string;
    RPBP: PersonnelInfoType;
    MTID: string;
    PRIO: '1' | '2' | '3' | '4' | '5';
    PRIO_COLOR: string;
    TTID: string;
    TGID: null | string;
    STIT: string;
    SQNR: string;
    TSDATA: string;
    TSDATA_PARSED: string;
    FILES: FileDataType[] | [];
    ENDDT: string;
    CRDT: string;
    CRDT_PARSED: string;
    CRTM: string;
    CRTM_PARSED: string;
    CHDT: string;
    CHTM: string;
    CRUS: PersonnelInfoType;
    CHUS: PersonnelInfoType;
    TREE_INDEX: number;
}