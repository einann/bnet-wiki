export declare const getWiki: (filter: any, dto?: string, filterCompareType?: "AND" | "OR", skip?: number, take?: number, sort?: any[], filterCompareTypes?: any[], getLayout?: true | false, layoutLanguage?: string) => Promise<any>;
export declare const addWiki: (payload: any[]) => Promise<any>;
export declare const updateWiki: (payload: any[]) => Promise<any>;
export declare const delWiki: (payload: string[]) => Promise<any>;
export declare const getWikiFile: (filter: any, dto?: string, filterCompareType?: "AND" | "OR", skip?: number, take?: number, sort?: any[], filterCompareTypes?: any[], getLayout?: true | false, layoutLanguage?: string) => Promise<any>;
export declare const addWikiFile: (payload: any) => Promise<any>;
export declare const delWikiFile: (payload: string[]) => Promise<any>;
export declare const addStream: (payload: any, fileName: string) => Promise<false | {
    fileData: any;
    fileName: string;
}>;
