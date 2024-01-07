import React from "react";
import { WikiActions, WikiStateProps } from "../types/context.types";
import { ProviderProps } from "../types/provider.types";
export declare const WikiContext: React.Context<{
    state: WikiStateProps;
    dispatch: React.Dispatch<WikiActions>;
}>;
export declare const WikiProvider: React.FC<ProviderProps>;
