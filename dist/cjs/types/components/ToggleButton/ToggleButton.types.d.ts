export interface ToggleButtonProps<T> {
    dataKey: T;
    text: string;
    checked?: boolean;
    change: (key: T) => void;
}
