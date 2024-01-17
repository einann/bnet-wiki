import React, { useContext } from "react";
import styled from "styled-components";
import TabButton from "../TabButton/TabButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { WikiContext } from "../../context/WikiContext";
import ToggleButton from "../ToggleButton/ToggleButton";
import { BiFilterAlt, BiMessageSquareAdd, BiRefresh } from "react-icons/bi";
import StatusFilterMenu from "../StatusFilterMenu/StatusFilterMenu";
import { defaultWikiCreateModel } from "../../constants/constants";

const StyledTabToolbar = styled.div(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "2rem",
    padding: "0 0.5rem",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    backgroundColor: "#FFF",

    "& > div": {
        display: "flex",
        alignItems: "center",
    }
}));

const StyledToggleButtonContainer = styled.div(() => ({
    marginLeft: "1rem",
    display: "flex",
    columnGap: "0.25rem",
}));

const TabToolbar: React.FC = () => {
    const { state: { _global, _tab }, dispatch } = useContext(WikiContext);
    const onToggleWikiTree = () => {
        dispatch({ type: "setTreeVisible", payload: !_global.treeVisible });
    }
    const onChangeWikiType = (wikiType: string) => {
        if (_tab.selectedWikiType !== wikiType) {
            dispatch({ type: "onSelectWikiType", payload: wikiType });
        }
    }

    const onOpenStatusFilterMenu = (e: React.MouseEvent) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !_global.popover.visible,
                child: <StatusFilterMenu source="tab" />
            }
        });
    }

    const onRefresh = () => {
        dispatch({ type: "refresh" });
    }

    const onOpenEditor = () => {
        dispatch({ type: "setDefaultWikiModel", payload: { model: { ...defaultWikiCreateModel, MTID: _global.selectedNode || " " } } });
        dispatch({ type: "setEditorVisible", payload: true });
    }

    return (
        <StyledTabToolbar>
            <div>
                <TabButton tooltip={`Ağacı ${_global.treeVisible ? 'gizle' : 'göster'}`} press={onToggleWikiTree}>
                    <GiHamburgerMenu />
                </TabButton>
                <StyledToggleButtonContainer>
                    <ToggleButton dataKey=" " text="Wiki" checked={_tab.selectedWikiType === " "} change={onChangeWikiType} />
                    <ToggleButton dataKey="T" text="Task" checked={_tab.selectedWikiType === "T"} change={onChangeWikiType} />
                    <ToggleButton dataKey="S" text="Form" checked={_tab.selectedWikiType === "S"} change={onChangeWikiType} />
                </StyledToggleButtonContainer>
            </div>
            <div>
                <TabButton tooltip="Yeni wiki ekle" press={onOpenEditor}>
                    <BiMessageSquareAdd />
                </TabButton>
                <TabButton tooltip="Duruma göre filtrele" press={(e) => onOpenStatusFilterMenu(e)}>
                    <BiFilterAlt />
                </TabButton>
                <TabButton tooltip="Yenile" press={onRefresh}>
                    <BiRefresh />
                </TabButton>
            </div>
        </StyledTabToolbar>
    )
}

export default TabToolbar;