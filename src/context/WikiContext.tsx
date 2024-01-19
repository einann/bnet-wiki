import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { WikiActions, WikiStateProps } from "../types/context.types";
import { ProviderProps } from "../types/provider.types";
import { buildWikiTree, findTsidOnSearchQuery, urlParse } from "../util/utils";
import { defaultStatusFilter, defaultWikiCreateModel } from "../constants/constants";
import { getWiki, getWikiFile } from "../service/service";
import { FileDataType, WikiRawDataType } from "../types/wikidata.types";

const initialState: WikiStateProps = {
    _global: {
        bktp_bkid: ["", ""],
        treeVisible: true,
        selectedNode: "",
        loading: false,
        error: false,
        rawData: [],
        treeData: [],
        editorOpen: false,
        defaultWikiModel: { model: defaultWikiCreateModel },
        popover: {
            posX: 0,
            posY: 0,
            visible: false,
            expandUpside: false,
            child: <span />,
        },
        toast: {
            visible: false,
            type: "default",
            message: "",
        },
        modal: {
            visible: false,
            header: "",
            children: null,
        }
    },
    _tree: {
        expandedNodes: [],
        searchQuery: "",
        visibleNodes: ["ALL"],
        statusFilter: defaultStatusFilter,
    },
    _tab: {
        statusFilter: defaultStatusFilter,
        selectedWikiType: " ",
        openTabs: [],
    }
};

const wikiReducer = (state: WikiStateProps, action: WikiActions) => {
    switch (action.type) {
        case "setTypeAndId":
            return { ...state, _global: { ...state._global, bktp_bkid: action.payload } };
        case "setTreeVisible":
            return { ...state, _global: { ...state._global, treeVisible: action.payload } };
        case "setSelectedNode":
            return { ...state, _global: { ...state._global, selectedNode: action.payload } };
        case "setLoading":
            return { ...state, _global: { ...state._global, loading: action.payload } };
        case "setError":
            return { ...state, _global: { ...state._global, error: action.payload } };
        case "setRawData":
            return { ...state, _global: { ...state._global, rawData: action.payload } };
        case "setTreeData":
            return { ...state, _global: { ...state._global, treeData: action.payload } };
        case "onExpandNode":
            return { ...state, _tree: { ...state._tree, expandedNodes: [...state._tree.expandedNodes, ...action.payload] } };
        case "onCollapseNode":
            return { ...state, _tree: { ...state._tree, expandedNodes: state._tree.expandedNodes.filter(item => !action.payload.includes(item)) } };
        case "setSearchQuery":
            if (action.payload.length > 2) {
                const foundNodes = findTsidOnSearchQuery(state._global.treeData, state._global.rawData, action.payload, []);
                state = { ...state, _tree: { ...state._tree, visibleNodes: foundNodes.map(item => item.TSID), expandedNodes: foundNodes.map(item => item.TSID) } };
            }
            else {
                state = { ...state, _tree: { ...state._tree, visibleNodes: ["ALL"], expandedNodes: [] } };
            }
            return { ...state, _tree: { ...state._tree, searchQuery: action.payload } };
        case "onShowPopover":
            const diffX = state._global.popover.posX - action.payload.posX;
            const diffY = state._global.popover.posY - action.payload.posY;
            if ((diffX < 25 && diffX > -25) && (diffY < 25 && diffY > -25)) {
                return { ...state, _global: { ...state._global, popover: { ...state._global.popover, visible: action.payload.visible } } };
            }
            return { ...state, _global: { ...state._global, popover: action.payload } };
        case "setEditorVisible":
            return { ...state, _global: { ...state._global, editorOpen: action.payload } };
        case "setDefaultWikiModel":
            return { ...state, _global: { ...state._global, defaultWikiModel: action.payload } };
        case "setTreeStatusFilter":
            return { ...state, _tree: { ...state._tree, statusFilter: action.payload } };
        case "setTabStatusFilter":
            return { ...state, _tab: { ...state._tab, statusFilter: action.payload } };
        case "onSelectWikiType":
            return { ...state, _tab: { ...state._tab, selectedWikiType: action.payload } };
        case "onOpenTab":
            const alreadyOpen = state._tab.openTabs.find(item => item.TSID === action.payload.TSID);
            if (!alreadyOpen) return { ...state, _tab: { ...state._tab, openTabs: [...state._tab.openTabs, action.payload] } };
        case "onCloseTab":
            if (action.payload === state._global.selectedNode) { // mevcut seçili olan tab kapatılmak isteniyorsa
                const tabIndex = state._tab.openTabs.findIndex(item => item.TSID === action.payload);
                if (state._tab.openTabs[tabIndex + 1]) {    // sağ tarafında açılı tab varsa onu seç
                    return {
                        ...state,
                        _global: { ...state._global, selectedNode: state._tab.openTabs[tabIndex + 1].TSID },
                        _tab: { ...state._tab, openTabs: state._tab.openTabs.filter(item => item.TSID !== action.payload) }
                    };
                }
                else if (state._tab.openTabs[tabIndex - 1]) {   // sol tarafında açılı tab varsa onu seç
                    return {
                        ...state,
                        _global: { ...state._global, selectedNode: state._tab.openTabs[tabIndex - 1].TSID },
                        _tab: { ...state._tab, openTabs: state._tab.openTabs.filter(item => item.TSID !== action.payload) }
                    };
                }
                else {
                    return {
                        ...state,
                        _global: { ...state._global, selectedNode: "" },
                        _tab: { ...state._tab, openTabs: state._tab.openTabs.filter(item => item.TSID !== action.payload) }
                    };
                }
            }
            return { ...state, _tab: { ...state._tab, openTabs: state._tab.openTabs.filter(item => item.TSID !== action.payload) } }
        case "onShowMessageToast":
            return { ...state, _global: { ...state._global, toast: action.payload } };
        case "onShowModal":
            return { ...state, _global: { ...state._global, modal: action.payload } };
        default:
            return state;
    }
}

export const WikiContext = createContext<{
    state: WikiStateProps,
    dispatch: React.Dispatch<WikiActions>
}>({
    state: initialState,
    dispatch: () => null,
});


const fetchData = async (dispatch: React.Dispatch<WikiActions>, payload: string) => {
    dispatch({ type: "setLoading", payload: true });
    dispatch({ type: "setError", payload: false });
    try {
        let response: { Data: WikiRawDataType[], Layout: null, Pagination: any } = await getWiki(urlParse(payload), "FullModelDto");
        response.Data = response.Data.filter(item => item.TSNM !== "denemeWiki");
        response.Data = response.Data.filter(item => item.TSDATA !== null);

        const fileFilter = urlParse(`DCST=X&BKID=${response.Data.map(item => item.TSID)}`);
        const fileResponse: { Data: FileDataType[], Layout: null, Pagination: any } = await getWikiFile(fileFilter);

        if (fileResponse.Data) {
            response.Data.forEach(item => {
                const files = fileResponse.Data.filter(file => file.BKID === item.TSID);
                item.FILES = files;
            });
        }
        else {
            response.Data.forEach(item => item.FILES = []);
        }

        const tree = buildWikiTree(response.Data);

        dispatch({ type: "setRawData", payload: response.Data });
        dispatch({ type: "setTreeData", payload: tree });

    }
    catch (error) {
        console.log(error)
        dispatch({ type: "setError", payload: true });
    }
    finally {
        dispatch({ type: "setLoading", payload: false });
    }
}


export const WikiProvider: React.FC<ProviderProps> = ({
    BKTP,
    BKID,
    children
}) => {
    const [state, dispatch] = useReducer<React.Reducer<WikiStateProps, WikiActions>>(wikiReducer, initialState);

    useEffect(() => {
        dispatch({ type: "setTypeAndId", payload: [BKTP, BKID] });
    }, [BKTP, BKID]);

    const enhancedDispatch = (action: WikiActions) => {
        dispatch(action);
        if (action.type === "refresh") {
            getWikiData();
        }
    }

    const getWikiData = () => {
        const filter = `BKTP=${BKTP}&BKID=${BKID}`;
        fetchData(dispatch, filter);
    }

    useEffect(() => {
        getWikiData();
    }, []);

    return (
        <WikiContext.Provider value={{ state, dispatch: enhancedDispatch }}>
            {children}
        </WikiContext.Provider>
    )
}