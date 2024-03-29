import { WikiRawDataType } from "../../types/wikidata.types";
export interface StyledWikiTabProps {
    isLoading: boolean;
    error: boolean;
}
export interface TabTreeProps {
    allData: WikiRawDataType[];
    openContextMenu: (e: any, item: WikiRawDataType) => void;
    openStatusMenu: (e: any, item: WikiRawDataType) => void;
    openPrioMenu: (e: any, item: WikiRawDataType) => void;
}
export interface StyledTabItemProps {
    iterationIndex: number;
}
export interface StyledCommentLineProps {
    treeIndex: number;
}
export interface StyledOpenTabsItemProps {
    selected: boolean;
}
export interface WikiFilesProps {
    item: WikiRawDataType;
}
