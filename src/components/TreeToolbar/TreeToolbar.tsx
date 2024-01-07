import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import TabButton from "../TabButton/TabButton";
import { BiCollapse, BiExpand, BiFilterAlt, BiMessageSquareAdd, BiRefresh, BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { WikiContext } from "../../context/WikiContext";
import { Colors } from "../../util/colors";
import { toUpperCaseByTurkish } from "../../util/utils";

const StyledTreeToolbar = styled.div(() => ({
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

const StyledSearchInput = styled.input(() => ({
    width: "7rem",
    border: "1px solid #ddd",
    borderRadius: "3px",
    padding: "0.1rem 1rem 0.1rem 0.3rem",

    "&:focus": {
        outline: "none",
    }
}));

const StyledSearchClose = styled.span(() => ({
    position: "absolute",
    right: "0.1rem",
    bottom: 0,
    cursor: "pointer",
    color: Colors.PRIMARY,

    "&:hover": {
        backgroundColor: "#DDD",
    }
}))

const TreeToolbar: React.FC = () => {
    const { state, dispatch } = useContext(WikiContext);
    const [searchVisible, setSearchVisible] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const onExpandAllNodes = () => {
        dispatch({ type: "onExpandNode", payload: state._global.rawData.map(item => item.TSID) });
    }

    const onCollapseAllNodes = () => {
        dispatch({ type: "onCollapseNode", payload: state._global.rawData.map(item => item.TSID) });
    }

    const onRefresh = () => {
        dispatch({ type: "refresh" });
    }

    const onOpenSearchInput = () => {
        setSearchVisible(true);
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        }
    }

    const onCloseSearchInput = () => {
        setSearchVisible(false);
        dispatch({ type: "setSearchQuery", payload: "" });
    }

    const onSearchQuery = (value: string) => {
        dispatch({ type: "setSearchQuery", payload: toUpperCaseByTurkish(value) });
    }

    console.log(state._tree)

    return (
        <StyledTreeToolbar>
            <div
                style={{ marginTop: "0.25rem" }}
            >
                <TabButton tooltip="Tümünü genişlet" press={onExpandAllNodes}>
                    <BiExpand />
                </TabButton>
                <TabButton tooltip="Tümünü daralt" press={onCollapseAllNodes}>
                    <BiCollapse />
                </TabButton>
            </div>

            <div>
                <div style={{
                    display: searchVisible ? "block" : "none",
                    position: "relative",
                }}>
                    <StyledSearchInput
                        ref={searchInputRef}
                        onChange={(e) => onSearchQuery(e.currentTarget.value)}
                    />
                    <StyledSearchClose onClick={onCloseSearchInput}>
                        <CgClose />
                    </StyledSearchClose>
                </div>
                <div
                    style={{ marginTop: "0.25rem" }}
                >
                    <TabButton tooltip="Ağaçta ara" press={onOpenSearchInput}>
                        <BiSearch />
                    </TabButton>
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
            </div>
        </StyledTreeToolbar>
    )
}

export default TreeToolbar;