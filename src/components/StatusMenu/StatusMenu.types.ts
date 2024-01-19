import { WikiRawDataType } from "../../types/wikidata.types";

export interface StatusMenuProps {
    change: (dataKey: string, source?: WikiRawDataType) => void;
    source?: WikiRawDataType;
}