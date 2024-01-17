import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { Colors, StatusColors } from "../../util/colors";
import { WikiContext } from "../../context/WikiContext";
import { StatusFilterMenuProps } from "./StatusFilterMenu.types";

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

const StyledMenuLabel = styled.label(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    padding: "0.25rem 0.75rem",

    cursor: "pointer",

    "&:hover": {
        backgroundColor: "#EEE",
    }
}));

const StyledApplyButton = styled.button(() => ({
    border: 0,
    padding: "0.25rem",
    backgroundColor: Colors.PRIMARY,
    color: "#FFF",
    cursor: "pointer",
    transition: "0.25s",

    "&:hover": {
        opacity: 0.9,
    }
}))

const StatusFilterMenu: React.FC<StatusFilterMenuProps> = ({
    source
}) => {
    const { state, dispatch } = useContext(WikiContext);
    const [selectedStatus, setSelectedStatus] = useState<string[]>(source === "tree" ? state._tree.statusFilter : state._tab.statusFilter);

    const onSelectStatus = (TSST: string) => {
        if (selectedStatus.includes(TSST)) {
            const filteredStatusList = selectedStatus.filter(item => item !== TSST);
            setSelectedStatus(filteredStatusList);
        }
        else {
            setSelectedStatus([...selectedStatus, TSST]);
        }
    }

    const onSelectAll = () => {
        const isAllSelected = prstDomainModel.every(item => selectedStatus.includes(item.DOMVL));
        if (isAllSelected) {
            setSelectedStatus([]);
        }
        else {
            const allStatus = prstDomainModel.map(item => item.DOMVL);
            setSelectedStatus(allStatus);
        }
    }

    const onApplyFilter = () => {
        dispatch({ type: source === "tree" ? "setTreeStatusFilter" : "setTabStatusFilter", payload: selectedStatus });
        dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });
    }

    return (
        <>
            <StyledMenuLabel htmlFor="selectAll" style={{
                borderBottom: "1px solid #ddd",
            }}>
                <input
                    type="checkbox"
                    id="selectAll"
                    onChange={onSelectAll}
                    checked={prstDomainModel.every(item => selectedStatus.includes(item.DOMVL))}
                />
                <div>Tümünü Seç</div>
            </StyledMenuLabel>

            {prstDomainModel.map(item => (
                <StyledMenuLabel
                    key={item.DOMVL}
                    htmlFor={'prst-' + item.DOMVL}
                >
                    <input
                        type="checkbox"
                        id={'prst-' + item.DOMVL}
                        onChange={() => onSelectStatus(item.DOMVL)}
                        checked={selectedStatus.includes(item.DOMVL)}
                    />
                    {/* <div style={{
                        padding: "0.33rem",
                        borderRadius: "50%",
                        backgroundColor: StatusColors[item.DOMVL]
                    }}></div> */}
                    <div>{item.DOMVLTX}</div>
                </StyledMenuLabel>
            ))}

            <StyledApplyButton onClick={onApplyFilter}>
                Uygula
            </StyledApplyButton>
        </>
    )
}

export default StatusFilterMenu;