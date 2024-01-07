import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { WikiActions, WikiStateProps } from "../types/context.types";
import { ProviderProps } from "../types/provider.types";
import { buildWikiTree, findTsidOnSearchQuery, toUpperCaseByTurkish } from "../util/utils";
import { WikiRawDataType } from "../types/wikidata.types";

const initialState: WikiStateProps = {
    _global: {
        treeVisible: true,
        selectedNode: " ",
        loading: false,
        error: false,
        rawData: [],
        treeData: [],
    },
    _tree: {
        expandedNodes: [],
        searchQuery: "",
        visibleNodes: ["ALL"],
    }
};

const wikiReducer = (state: WikiStateProps, action: WikiActions) => {
    switch (action.type) {
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
        const res = await fetch(`http://localhost:4000/tickets`);
        const response = await res.json();
        const tree = buildWikiTree(response);

        dispatch({ type: "setRawData", payload: response });
        dispatch({ type: "setTreeData", payload: tree });
    }
    catch {
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