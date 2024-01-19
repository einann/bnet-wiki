/// <reference types="react" />
import React$1 from 'react';

type PersonnelInfoType = {
    CLID: string;
    BPID: string;
    BPNM: string;
    USNM: string;
    BPTP: string;
    CPTP: string;
    ACTIVE: ' ' | 'X';
    BMAIL: string;
    PMAIL: string;
    OOJID: string;
    OOJNM: string;
    SOJNM: string;
};
type PRSTValuesType = '0' | '1' | '2' | '3' | '4' | 'C' | 'A' | 'R' | 'D' | 'P';
type FileDataType = {
    BKID: string;
    BKTP: string;
    CHDT: string;
    CHTM: string;
    CHUS: PersonnelInfoType;
    CLID: string;
    CRDT: string;
    CRTM: string;
    CRUS: PersonnelInfoType;
    DCDATA: {
        CLID: string | null;
        DCID: string | null;
        DCDATA: string | null;
    };
    DCID: string;
    DCNM: string;
    DCSIZE: null | string | number;
    DCST: string;
    DCTP: string;
    DataBase64: string;
    StreamFile: {
        DisplayName: null | string;
        Extension: string;
        FileName: string;
    };
};
type WikiRawDataType = {
    Child: WikiRawDataType[] | [];
    CLID: string;
    TSID: string;
    TSNM: string;
    TSTP: ' ' | 'T' | 'S';
    TSST: PRSTValuesType;
    TSSTCLR: string | undefined;
    BKTP: string;
    BKID: string;
    RPBP: PersonnelInfoType;
    MTID: string;
    PRIO: '1' | '2' | '3' | '4' | '5';
    PRIO_COLOR: string;
    TTID: string;
    TGID: null | string;
    STIT: string;
    SQNR: string;
    TSDATA: string;
    TSDATA_PARSED: string;
    FILES: FileDataType[] | [];
    ENDDT: string;
    CRDT: string;
    CRDT_PARSED: string;
    CRTM: string;
    CRTM_PARSED: string;
    CHDT: string;
    CHTM: string;
    CRUS: PersonnelInfoType;
    CHUS: PersonnelInfoType;
    TREE_INDEX: number;
};

interface ContextMenuProps {
    item: WikiRawDataType;
}

declare const ContextMenu: React$1.FC<ContextMenuProps>;

declare const Error: React$1.FC;

declare const Loading: React$1.FC;

interface MessageToastProps {
    type?: "success" | "error" | "info" | "warning" | "default";
    message: string;
}

declare const MessageToast: React$1.FC<MessageToastProps>;

interface ModalProps {
    children: React.ReactNode;
}

declare const Modal: React$1.FC<ModalProps>;

interface PopoverProps {
    children: React.ReactNode;
}

declare const Popover: React$1.FC<PopoverProps>;

interface PrioProps<T> {
    dataKey: T;
}

declare const Prio: React$1.FC<PrioProps<string>>;

interface PrioMenuProps {
    change: (dataKey: string, source?: WikiRawDataType) => void;
    source?: WikiRawDataType;
}

declare const PrioMenu: React$1.FC<PrioMenuProps>;

declare const QuickWikiCreate: React$1.FC;

interface StatusProps<T> {
    dataKey: T;
}

declare const Status: React$1.FC<StatusProps<string>>;

interface StatusFilterMenuProps {
    source: "tree" | "tab";
}

declare const StatusFilterMenu: React$1.FC<StatusFilterMenuProps>;

interface StatusMenuProps {
    change: (dataKey: string, source?: WikiRawDataType) => void;
    source?: WikiRawDataType;
}

declare const StatusMenu: React$1.FC<StatusMenuProps>;

interface TabButtonProps {
    children: React.ReactNode;
    press?: (e?: any) => void;
    tooltip?: string;
}

declare const TabButton: React$1.FC<TabButtonProps>;

declare const TabToolbar: React$1.FC;

interface ToggleButtonProps<T> {
    dataKey: T;
    text: string;
    checked?: boolean;
    change: (key: T) => void;
}

declare const ToggleButton: React$1.FC<ToggleButtonProps<string>>;

declare const TreeToolbar: React$1.FC;

interface WikiProps {
    BKTP: string;
    BKID: string;
}

declare const Wiki: React$1.FC<WikiProps>;

declare const WikiContainer: React$1.FC;

interface WikiEditorProps {
    model: {
        TSID?: string;
        MTID: string;
        TSST: string;
        PRIO: string;
        TSNM: string;
        TSDATA: string;
    };
}

declare const WikiEditor: React$1.FC<WikiEditorProps>;

declare const WikiTab: React$1.FC;

declare const WikiTree: React$1.FC;

export { ContextMenu, Error, Loading, MessageToast, Modal, Popover, Prio, PrioMenu, QuickWikiCreate, Status, StatusFilterMenu, StatusMenu, TabButton, TabToolbar, ToggleButton, TreeToolbar, Wiki, WikiContainer, WikiEditor, WikiTab, WikiTree };
