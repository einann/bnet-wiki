export interface WikiStateProps {
    _global: {
        treeVisible: boolean;
        selectedNode: string;
        loading: boolean;
        error: boolean;
    };
}
interface TreeVisibleProps {
    type: "setTreeVisible";
    payload: boolean;
}
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
export type WikiActions = TreeVisibleProps | SelectedNodeProps | LoadingProps | ErrorProps | RefreshProps;
export {};
