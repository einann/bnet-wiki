import { WikiRawDataType } from "../../types/wikidata.types";

export interface StyledWikiTreeProps {
    isToggled: boolean;
    isLoading: boolean;
    error: boolean;
}

export interface TreeProps {
    allData: WikiRawDataType[];
    expanded: boolean;
}

export interface StyledTreeItemProps {
    iterationIndex: number;
    isOnSearchQuery: boolean;
    isSelected: boolean;
}