import React, { useContext, useRef } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import { Colors } from "../../util/colors";
import { device } from "../../util/breakpoints";
import { StyledCommentLineProps, StyledOpenTabsItemProps, StyledTabItemProps, StyledWikiTabProps, TabTreeProps } from "./WikiTab.types";
import { WikiContext } from "../../context/WikiContext";
import { BsPersonCircle } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { WikiRawDataType } from "../../types/wikidata.types";
import { buildWikiTree, calculateTreeIndex } from "../../util/utils";
import { MdAttachFile, MdClose, MdDelete } from "react-icons/md";
import { delWikiFile, updateWiki } from "../../service/service";

import TabToolbar from "../TabToolbar/TabToolbar";
import Status from "../Status/Status";
import Prio from "../Prio/Prio";
import StatusMenu from "../StatusMenu/StatusMenu";
import PrioMenu from "../PrioMenu/PrioMenu";
import QuickWikiCreate from "../QuickWikiCreate/QuickWikiCreate";
import ContextMenu from "../ContextMenu/ContextMenu";
import WikiFiles from "./WikiFiles";

const StyledWikiTab = styled.div<StyledWikiTabProps>((props) => ({
    display: "flex",
    flexDirection: "column",
    flex: 5,
    height: "100%",
    border: "1px solid #ddd",
    backgroundColor: Colors.BG_PRIMARY,
    opacity: props.isLoading || props.error ? 0.5 : 1,
    pointerEvents: props.isLoading || props.error ? "none" : "auto",

    [`@media (${device.sm})`]: {
        flexDirection: "column",
    },
}));

const StyledTabContainer = styled.div(() => ({
    display: "flex",
    flexDirection: "column",
    rowGap: "0.1rem",
    flex: 1,
    width: "100%",
    padding: "0 0.5rem 0.5rem 0.5rem",
    overflowX: "hidden",
    wordWrap: "break-word",
    marginTop: "0.5rem",
}));

const StyledTabItem = styled.div<StyledTabItemProps>((props) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: "0.25rem 0.5rem",
    borderTop: "1px solid #EEE",
    borderBottom: "1px solid #EEE",
    marginLeft: `${props.iterationIndex * 2}rem`,
}));

const StyledTabItemHeader = styled.div(() => ({
    display: "flex",
    justifyContent: "space-between",
}));

const StyledTabItemInfoContainer = styled.div(() => ({
    display: "flex",
    columnGap: "0.5rem",
    fontSize: "0.7rem",
    alignItems: "center",
}));

const StyledTabItemTimeContainer = styled.div(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.25rem",
    color: "#999"
}));

const StyledHorizontalCommentLine = styled.div<StyledCommentLineProps>((props) => ({
    display: props.treeIndex === 0 ? "none" : "block",
    position: "absolute",
    border: "1px solid #EEE",
    width: "1.25rem",
    left: "-1.25rem",
    top: "50%",
}));

const StyledVerticalCommentLine = styled.div<StyledCommentLineProps>((props) => ({
    position: "absolute",
    left: `${props.treeIndex * 2 + 0.75}rem`,
    height: "-webkit-fill-available",
    border: "1px solid #eee",
}));

const StyledOpenTabs = styled.div(() => ({
    marginTop: "0.25rem",
    backgroundColor: "#f5f8fa",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    height: "1.75rem",
    padding: "0 0.5rem",
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    overflowX: "hidden",
    overflowY: "hidden",
}));

const StyledOpenTabsItem = styled.div<StyledOpenTabsItemProps>((props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "7rem",
    maxWidth: "7rem",
    cursor: "pointer",
    height: "1.75rem",
    padding: "0 0.25rem",
    transition: "0.25s",
    // borderRadius: "5px",
    borderBottom: props.selected ? "1px solid #446d88" : "0",

    "&:hover": {
        backgroundColor: "#dde7ee"
    }
}));

const StyledTabItemCloseButton = styled.button(() => ({
    border: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
    marginTop: "0.1rem",
    cursor: "pointer",
    padding: "0.25rem",
    transition: "0.25s",
    borderRadius: "5px",

    "&:hover": {
        backgroundColor: "#aac3d4",
    }
}));

const WikiTab: React.FC = () => {
    const { state, dispatch } = useContext(WikiContext);
    const filtered = state._global.rawData.filter(item => state._tab.statusFilter.includes(item.TSST) && item.TSTP === state._tab.selectedWikiType);
    const builded = buildWikiTree(filtered);
    //
    function findDataInTree(tsid: string, tree: WikiRawDataType[]): WikiRawDataType[] {
        const result: WikiRawDataType[] = [];
        const searchData = (item: WikiRawDataType) => {
            if (item.TSID === tsid) {
                result.push(item);
            }
            if (item.Child && item.Child.length > 0) {
                item.Child.forEach(child => searchData(child));
            }
        };
        tree.forEach(searchData);
        return result;
    }
    //
    let tabContent = builded;
    if (state._global.selectedNode) {
        tabContent = findDataInTree(state._global.selectedNode, state._global.treeData);
        tabContent = calculateTreeIndex(tabContent, 0, true);
    }

    const onUpdateWiki = async (key: "TSST" | "PRIO", value: string, item?: WikiRawDataType) => {
        dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });

        const payload = Object.assign({}, {
            ...item,
            [key]: value,
        });

        dispatch({ type: "setLoading", payload: true });
        const response = await updateWiki([payload]);
        if (response) {
            dispatch({ type: "refresh" });
        }
        else {
            dispatch({ type: "setLoading", payload: false });
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "error", message: "Wiki güncellenirken bir hata meydana geldi." } });
        }
    }

    const onOpenContextMenu = (e: React.MouseEvent, item: WikiRawDataType) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !state._global.popover.visible,
                child: <ContextMenu item={item} />,
            }
        });
    }

    const onChangeStatus = async (DOMVL: string, item?: WikiRawDataType) => {
        await onUpdateWiki("TSST", DOMVL, item);
    }

    const onOpenStatusMenu = (e: React.MouseEvent, item: WikiRawDataType) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !state._global.popover.visible,
                child: <StatusMenu change={onChangeStatus} source={item} />
            }
        });
    }

    const onChangePrio = async (DOMVL: string, item?: WikiRawDataType) => {
        await onUpdateWiki("PRIO", DOMVL, item);
    }

    const onOpenPrioMenu = (e: React.MouseEvent, item: WikiRawDataType) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !state._global.popover.visible,
                child: <PrioMenu change={onChangePrio} source={item} />
            }
        });
    }

    

    return (
        <StyledWikiTab isLoading={state._global.loading} error={state._global.error}>
            <TabToolbar />

            <OpenTabs />

            <StyledTabContainer>
                <TabTree
                    allData={tabContent}
                    openContextMenu={onOpenContextMenu}
                    openStatusMenu={onOpenStatusMenu}
                    openPrioMenu={onOpenPrioMenu}
                />
            </StyledTabContainer>

            <QuickWikiCreate />

        </StyledWikiTab>
    )
}


const OpenTabs: React.FC = () => {
    const { state: { _global, _tab }, dispatch } = useContext(WikiContext);
    const closeBtnRef = useRef<any>(null);
    const onSelectTab = (e: any, TSID: string) => {
        dispatch({ type: "setSelectedNode", payload: TSID });
    }

    const onCloseTab = (TSID: string) => {
        dispatch({ type: "onCloseTab", payload: TSID });
    }
    return (
        <>
            {_tab.openTabs.length > 0 && (
                <StyledOpenTabs>
                    {_tab.openTabs.map(item => (
                        <StyledOpenTabsItem
                            key={item.TSID}
                            selected={_global.selectedNode === item.TSID}
                        >
                            <span style={{
                                flex: 1,
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                padding: "0.33rem 0",
                            }} onClick={(e) => onSelectTab(e, item.TSID)}>
                                {item.TSNM.trim() ? item.TSNM : <span>&nbsp;&nbsp;</span>}
                            </span>
                            <StyledTabItemCloseButton onClick={() => onCloseTab(item.TSID)} ref={closeBtnRef}>
                                <MdClose />
                            </StyledTabItemCloseButton>
                        </StyledOpenTabsItem>
                    ))}
                </StyledOpenTabs>
            )}
        </>
    )
}


const TabTree: React.FC<TabTreeProps> = ({
    allData,
    openContextMenu,
    openStatusMenu,
    openPrioMenu,
}) => {
    return (
        <>
            {allData.map(item => (
                <div style={{ position: "relative" }}>
                    <StyledTabItem iterationIndex={item.TREE_INDEX} key={item.TSID}>
                        <StyledTabItemHeader>
                            <span style={{
                                color: "#888",
                            }}>
                                {item.CRUS.BPNM || ""}
                            </span>

                            <StyledTabItemInfoContainer>
                                <BsPersonCircle />
                                <span style={{
                                    fontWeight: "bold",
                                    color: "#999"
                                }}>
                                    {item.RPBP && item.RPBP.BPNM ? item.RPBP.BPNM : ""}
                                </span>
                                <div onClick={(e) => openStatusMenu(e, item)}>
                                    <Status dataKey={item.TSST} />
                                </div>
                                <div onClick={(e) => openPrioMenu(e, item)}>
                                    <Prio dataKey={item.PRIO} />
                                </div>
                                <StyledTabItemTimeContainer>
                                    <span>
                                        {item.CRDT_PARSED}
                                    </span>
                                    <span>
                                        {item.CRTM_PARSED}
                                    </span>
                                </StyledTabItemTimeContainer>

                                <div style={{ padding: "0.25rem", cursor: "pointer" }} onClick={(e) => openContextMenu(e, item)}>
                                    <BiDotsVerticalRounded />
                                </div>

                            </StyledTabItemInfoContainer>
                        </StyledTabItemHeader>

                        <div style={{
                            fontWeight: "bold",
                            color: Colors.PRIMARY,
                        }}>
                            <span>{item.TSNM}</span>
                        </div>

                        <div className="wiki-content-container">
                            {parse(item.TSDATA_PARSED)}
                        </div>

                        <WikiFiles item={item} />

                        <StyledHorizontalCommentLine treeIndex={item.TREE_INDEX} />

                    </StyledTabItem>

                    <StyledVerticalCommentLine treeIndex={item.TREE_INDEX} />
                    {item.Child &&
                        <TabTree
                            allData={item.Child}
                            openContextMenu={openContextMenu}
                            openStatusMenu={openStatusMenu}
                            openPrioMenu={openPrioMenu}
                        />
                    }
                </div>
            ))}
        </>
    )
}

export default WikiTab;