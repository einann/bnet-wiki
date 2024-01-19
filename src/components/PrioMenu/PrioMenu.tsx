import React from "react";
import { styled } from "styled-components";
import { PrioMenuProps } from "./PrioMenu.types";
import { BsFillFlagFill } from "react-icons/bs";
import { PrioColors } from "../../util/colors";

const prioDomainModel = [
    {
        "DOMNM": "/BNT/PRIO",
        "DOMVL": "1",
        "DOMVLTX": "Çok Yüksek",
        "DOMVLSQ": "0001",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRIO",
        "DOMVL": "2",
        "DOMVLTX": "Yüksek",
        "DOMVLSQ": "0002",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRIO",
        "DOMVL": "3",
        "DOMVLTX": "Orta",
        "DOMVLSQ": "0003",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRIO",
        "DOMVL": "4",
        "DOMVLTX": "Düşük",
        "DOMVLSQ": "0004",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRIO",
        "DOMVL": "5",
        "DOMVLTX": "Çok Düşük",
        "DOMVLSQ": "0005",
        "ACTIVE": " ",
        "LANG": null
    }
];

const StyledMenuItem = styled.li(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    padding: "0.33rem 0.75rem",
    cursor: "pointer",

    "&:hover": {
        backgroundColor: "#EEE",
    }
}));


const PrioMenu: React.FC<PrioMenuProps> = ({
    change,
    source,
}) => {
    return (
        <>
            {prioDomainModel.map(item => (
                <StyledMenuItem key={item.DOMVL} onClick={() => change(item.DOMVL, source)}>
                    <BsFillFlagFill style={{
                        color: PrioColors[item.DOMVL],
                    }} />
                    <div>{item.DOMVLTX}</div>
                </StyledMenuItem>
            ))}
        </>
    )
}

export default PrioMenu;