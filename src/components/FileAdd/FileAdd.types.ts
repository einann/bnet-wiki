export interface FileAddProps {
    TSID: string;
}

export interface FileListProps {
    file: File;
    status: "idle" | "success" | "error" | "loading";
}