/// <reference types="react" />
export interface TabButtonProps {
    children: React.ReactNode;
    press?: (e?: any) => void;
    tooltip?: string;
}
