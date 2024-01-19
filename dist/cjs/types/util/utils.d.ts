import { WikiRawDataType } from "../types/wikidata.types";
export declare const buildWikiTree: (data: WikiRawDataType[], id?: string) => WikiRawDataType[];
export declare const calculateTreeIndex: (data: WikiRawDataType[], parentTreeIndex?: number, subTabOpen?: boolean) => WikiRawDataType[];
export declare const toUpperCaseByTurkish: (query: string) => string;
export declare const findTsidOnSearchQuery: (allData: WikiRawDataType[], rawData: WikiRawDataType[], query: string, result: any[]) => any[];
export declare const b64DecodeUnicode: (str: string) => string;
export declare const urlParse: (value: string, grup?: string, type?: string, lover?: string) => any[];
