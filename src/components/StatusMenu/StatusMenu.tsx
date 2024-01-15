import React from "react";
import { styled } from "styled-components";
import { StatusColors } from "../../util/colors";
import { StatusMenuProps } from "./StatusMenu.types";

const prstDomainModel = [
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "0",
        "DOMVLTX": "Yeni",
        "DOMVLSQ": "0001",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "1",
        "DOMVLTX": "İşleniyor",
        "DOMVLSQ": "0002",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "2",
        "DOMVLTX": "Test",
        "DOMVLSQ": "0003",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "3",
        "DOMVLTX": "Problem",
        "DOMVLSQ": "0004",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "4",
        "DOMVLTX": "Tamamlandı",
        "DOMVLSQ": "0005",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "C",
        "DOMVLTX": "Kapatıldı",
        "DOMVLSQ": "0006",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "A",
        "DOMVLTX": "Otomatik Kapatıldı",
        "DOMVLSQ": "0007",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "R",
        "DOMVLTX": "İptal Edildi",
        "DOMVLSQ": "0008",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "D",
        "DOMVLTX": "Silindi",
        "DOMVLSQ": "0009",
        "ACTIVE": " ",
        "LANG": null
    },
    {
        "DOMNM": "/BNT/PRST",
        "DOMVL": "P",
        "DOMVLTX": "Plan",
        "DOMVLSQ": "0010",
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



const StatusMenu: React.FC<StatusMenuProps> = ({
    change,
}) => {
    return (
        <>
            {prstDomainModel.map(item => (
                <StyledMenuItem key={item.DOMVL} onClick={() => change(item.DOMVL)}>
                    <div style={{
                        padding: "0.33rem",
                        borderRadius: "50%",
                        backgroundColor: StatusColors[item.DOMVL]
                    }}></div>
                    <div>{item.DOMVLTX}</div>
                </StyledMenuItem>
            ))}
        </>
    )
}

export default StatusMenu;