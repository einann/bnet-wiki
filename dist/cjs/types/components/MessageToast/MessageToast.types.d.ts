export interface MessageToastProps {
    type?: "success" | "error" | "info" | "warning" | "default";
    message: string;
}
export interface StyledMessageToastProps {
    bgcolor: string;
}
