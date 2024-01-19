import { WikiRawDataType } from "../../types/wikidata.types";

export interface PrioMenuProps {
    change: (dataKey: string, source?: WikiRawDataType) => void;
    source?: WikiRawDataType;
}