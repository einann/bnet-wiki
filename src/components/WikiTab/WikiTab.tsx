import React, { useContext } from "react";
import styled from "styled-components";
import TabToolbar from "../TabToolbar/TabToolbar";
import { Colors } from "../../util/colors";
import { device } from "../../util/breakpoints";
import { StyledCommentLineProps, StyledTabItemProps, StyledWikiTabProps, TabTreeProps } from "./WikiTab.types";
import { WikiContext } from "../../context/WikiContext";
import parse from "html-react-parser";
import { BsPersonCircle } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Status from "../Status/Status";
import Prio from "../Prio/Prio";
import QuickWikiCreate from "../QuickWikiCreate/QuickWikiCreate";

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

const WikiTab: React.FC = () => {
    const { state: { _global } } = useContext(WikiContext);
    return (
        <StyledWikiTab isLoading={_global.loading} error={_global.error}>
            <TabToolbar />

            <StyledTabContainer>
                <TabTree allData={_global.treeData} />
            </StyledTabContainer>

            <QuickWikiCreate />

        </StyledWikiTab>
    )
}

const TabTree: React.FC<TabTreeProps> = ({
    allData
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
                                {item.CRUS.BPNM}
                            </span>

                            <StyledTabItemInfoContainer>
                                <BsPersonCircle />
                                <span style={{
                                    fontWeight: "bold",
                                    color: "#999"
                                }}>
                                    {item.RPBP.BPNM}
                                </span>
                                <span>
                                    <Status dataKey={item.TSST} />
                                </span>
                                <span>
                                    <Prio dataKey={item.PRIO} />
                                </span>
                                <StyledTabItemTimeContainer>
                                    <span>
                                        {item.CRDT_PARSED}
                                    </span>
                                    <span>
                                        {item.CRTM_PARSED}
                                    </span>
                                </StyledTabItemTimeContainer>

                                <div>
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

                        <div>
                            {parse(item.MESSAGE_PARSED)}
                        </div>

                        <StyledHorizontalCommentLine treeIndex={item.TREE_INDEX} />

                    </StyledTabItem>

                    <StyledVerticalCommentLine treeIndex={item.TREE_INDEX} />
                    {item.Child && <TabTree allData={item.Child} />}
                </div>
            ))}
        </>
    )
}

export default WikiTab;