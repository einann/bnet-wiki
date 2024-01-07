import React, { useContext } from "react";
import styled from "styled-components";
import TabButton from "../TabButton/TabButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { WikiContext } from "../../context/WikiContext";
import ToggleButton from "../ToggleButton/ToggleButton";
import { BiFilterAlt, BiMessageSquareAdd, BiRefresh } from "react-icons/bi";

const StyledTabToolbar = styled.div(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "2rem",
    padding: "0 0.5rem",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    backgroundColor: "#FFF",
    marginBottom: "0.5rem",

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
    const { state: { _global }, dispatch } = useContext(WikiContext);
    const onToggleWikiTree = () => {
        dispatch({ type: "setTreeVisible", payload: !_global.treeVisible });
    }
    const onChangeTaskType = (taskType: string) => {
        // if (_global.selectedNode !== taskType) {
        //     dispatch({ type: "setSelectedNode", payload: taskType });
        // }
    }
    const onRefresh = () => {
        dispatch({ type: "refresh" });
    }
    return (
        <StyledTabToolbar>
            <div>
                <TabButton tooltip={`Ağacı ${_global.treeVisible ? 'gizle' : 'göster'}`} press={onToggleWikiTree}>
                    <GiHamburgerMenu />
                </TabButton>
                <StyledToggleButtonContainer>
                    <ToggleButton dataKey=" " text="Wiki" checked={true} change={onChangeTaskType} />
                    <ToggleButton dataKey="T" text="Task" checked={false} change={onChangeTaskType} />
                    <ToggleButton dataKey="S" text="Form" checked={false} change={onChangeTaskType} />
                </StyledToggleButtonContainer>
            </div>
            <div>
                <TabButton tooltip="Yeni wiki ekle">
                    <BiMessageSquareAdd />
                </TabButton>
                <TabButton tooltip="Duruma göre filtrele">
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