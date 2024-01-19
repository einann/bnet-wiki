interface ColorProps {
    PRIMARY: string;
    SECONDARY: string,
    BG_PRIMARY: string;
};

interface StatusColorProps {
    0: string,
    1: string,
    2: string,
    3: string,
    4: string,
    C: string,
    D: string,
    R: string,
    I: string,
};

interface PrioColorProps {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
}

export const Colors: ColorProps = {
    PRIMARY: "#346187",
    SECONDARY: "#DB2777",
    BG_PRIMARY: "#F9F9F9",
};

export const StatusColors: any = {
    "0": "#ececec",
    "1": "#ffc480",
    "2": "#ffc480",
    "3": "#f16940",
    "4": "#5ddb7a",
    "C": "#db4d4d",
    "D": "#db4d4d",
    "R": "#db4d4d",
    "I": "#2976a9",
};

export const PrioColors: any = {
    "1": "#e44646",
    "2": "#ff7b53",
    "3": "#2a9cd1",
    "4": "#ffb54d",
    "5": "#f1ce96",
}