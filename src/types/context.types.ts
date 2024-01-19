import { WikiEditorProps } from "../components/WikiEditor/WikiEditor.types";
import { WikiRawDataType } from "./wikidata.types";

// STATE TYPE
export interface WikiStateProps {
    _global: {
        bktp_bkid: [string, string];
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
        };
        toast: {
            visible: boolean;
            type?: "success" | "error" | "info" | "warning" | "default";
            message: string;
        };
        modal: {
            visible: boolean;
            header: string;
            children: React.ReactNode;
        };
    };
    _tree: {
        expandedNodes: string[];
        searchQuery: string;
        visibleNodes: string[];
        statusFilter: string[];
    };
    _tab: {
        statusFilter: string[];
        selectedWikiType: string;
        openTabs: { TSID: string, TSNM: string }[];
    };
}

// PAYLOAD TYPES
interface BKTP_BKID_Props {
    type: "setTypeAndId";
    payload: [string, string];
};

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

interface TreeStatusFilterProps {
    type: "setTreeStatusFilter";
    payload: string[];
}

interface TabStatusFilterProps {
    type: "setTabStatusFilter";
    payload: string[];
}

interface SelectedWikiTypeProps {
    type: "onSelectWikiType";
    payload: string;
}

interface OpenTabProps {
    type: "onOpenTab";
    payload: { TSID: string, TSNM: string };
}

interface CloseTabProps {
    type: "onCloseTab";
    payload: string;
}

interface ShowMessageToastProps {
    type: "onShowMessageToast";
    payload: {
        visible: boolean;
        type?: "success" | "error" | "info" | "warning" | "default";
        message: string;
    }
}

interface ShowModalProps {
    type: "onShowModal";
    payload: {
        visible: boolean;
        header: string;
        children: React.ReactNode;
    }
}

export type WikiActions =
    BKTP_BKID_Props
    | TreeVisibleProps
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
    | TreeStatusFilterProps
    | TabStatusFilterProps
    | SelectedWikiTypeProps
    | OpenTabProps
    | CloseTabProps
    | ShowMessageToastProps
    | ShowModalProps