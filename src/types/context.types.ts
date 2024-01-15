import { WikiEditorProps } from "../components/WikiEditor/WikiEditor.types";
import { WikiRawDataType } from "./wikidata.types";

// STATE TYPE
export interface WikiStateProps {
    _global: {
        treeVisible: boolean;
        selectedNode: string;
        loading: boolean;
        error: boolean;
        rawData: WikiRawDataType[];
        treeData: WikiRawDataType[];
        editorOpen: boolean;
        defaultWikiModel: WikiEditorProps;
        popover: {
            posX: number;
            posY: number;
            visible: boolean;
            expandUpside?: boolean;
            child: React.ReactNode;
        }
    };
    _tree: {
        expandedNodes: string[];
        searchQuery: string;
        visibleNodes: string[],
    }
}

// PAYLOAD TYPES
interface TreeVisibleProps {
    type: "setTreeVisible";
    payload: boolean;
};

interface SelectedNodeProps {
    type: "setSelectedNode";
    payload: string;
}

interface LoadingProps {
    type: "setLoading";
    payload: boolean;
}

interface ErrorProps {
    type: "setError";
    payload: boolean;
}

interface RefreshProps {
    type: "refresh";
}

interface RawDataProps {
    type: "setRawData";
    payload: WikiRawDataType[];
}

interface TreeDataProps {
    type: "setTreeData";
    payload: WikiRawDataType[];
}

interface ExpandNodeProps {
    type: "onExpandNode";
    payload: string[];
}

interface CollapseNodeProps {
    type: "onCollapseNode";
    payload: string[];
}

interface SearchQueryProps {
    type: "setSearchQuery";
    payload: string;
}

interface VisibleNodesProps {
    type: "setSearchQuery";
    payload: string;
}

interface PopoverProps {
    type: "onShowPopover";
    payload: {
        posX: number;
        posY: number;
        visible: boolean;
        expandUpside?: boolean;
        child: React.ReactNode,
    }
}

interface EditorProps {
    type: "setEditorVisible";
    payload: boolean;
}

interface DefaultModelProps {
    type: "setDefaultWikiModel";
    payload: WikiEditorProps;
}

export type WikiActions =
    TreeVisibleProps
    | SelectedNodeProps
    | LoadingProps
    | ErrorProps
    | RefreshProps
    | RawDataProps
    | TreeDataProps
    | ExpandNodeProps
    | CollapseNodeProps
    | SearchQueryProps
    | VisibleNodesProps
    | PopoverProps
    | EditorProps
    | DefaultModelProps