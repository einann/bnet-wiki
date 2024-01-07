import React, { useContext } from "react";
import styled from "styled-components";
import TreeToolbar from "../TreeToolbar/TreeToolbar";
import { Colors } from "../../util/colors";
import { WikiContext } from "../../context/WikiContext";
import { StyledTreeItemProps, StyledWikiTreeProps, TreeProps } from "./WikiTree.types";
import { device } from "../../util/breakpoints";
import { BiDotsVerticalRounded, BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import Status from "../Status/Status";

const StyledWikiTree = styled.div<StyledWikiTreeProps>((props) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "1px solid #DDD",
    backgroundColor: Colors.BG_PRIMARY,
    transition: "0.25s",
    width: props.isToggled ? "20%" : "0%",
    opacity: props.isToggled ? (props.isLoading || props.error ? 0.5 : 1) : 0,
    pointerEvents: props.isLoading || props.error ? "none" : "auto",

    [`@media (${device.sm})`]: {
        width: props.isToggled ? "100%" : "0%",
        height: props.isToggled ? "50%" : "0%",
    }
}));

const StyledTreeContainer = styled.div(() => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    padding: "0.5rem 0 0.5rem 0.5rem",
    overflowY: "scroll",
}));

const StyledTreeItem = styled.div<StyledTreeItemProps>((props) => ({
    display: props.isOnSearchQuery ? "flex" : "none",
    justifyContent: "space-between",
    alignItems: "center",
    width: "initial",
    padding: "0.2rem 0",
    marginLeft: `${props.iterationIndex}rem`,
    fontWeight: props.iterationIndex === 0 ? "bold" : "normal",
    borderRadius: "5px",
    transition: "0.25s",

    "&:hover": {
        backgroundColor: "#EEE"
    },

    "& > div": {
        display: "flex",
        alignItems: "center",
        columnGap: "0.5rem",
        marginRight: "0.5rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
    },
}))

const WikiTree: React.FC = () => {
    const { state: { _global } } = useContext(WikiContext);
    return (
        <StyledWikiTree isToggled={_global.treeVisible} isLoading={_global.loading} error={_global.error}>
            <TreeToolbar />

            <StyledTreeContainer>
                <Tree allData={_global.treeData} expanded={true} />
            </StyledTreeContainer>

        </StyledWikiTree>
    )
}

const Tree: React.FC<TreeProps> = ({
    allData,
    expanded,
}) => {
    const { state: { _tree }, dispatch } = useContext(WikiContext);

    const onExpandOrCollapseNode = (TSID: string) => {
        if (_tree.expandedNodes.includes(TSID)) {
            dispatch({ type: "onCollapseNode", payload: [TSID] });
        }
        else {
            dispatch({ type: "onExpandNode", payload: [TSID] });
        }
    }

    return (
        <div style={{ display: expanded ? "block" : "none" }}>
            {allData.map(item => (
                <>
                    <StyledTreeItem key={item.TSID} iterationIndex={item.TREE_INDEX} isOnSearchQuery={_tree.visibleNodes.includes("ALL") || _tree.visibleNodes.includes(item.TSID)}>
                        <div style={{
                            flex: 1,
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                            }} onClick={() => onExpandOrCollapseNode(item.TSID)}>
                                <div style={{
                                    width: "0.75rem",
                                    height: "0.75rem",
                                    color: Colors.PRIMARY,
                                }}>
                                    {item.Child.length ? (_tree.expandedNodes.includes(item.TSID) ? <BiMinusCircle /> : <BiPlusCircle />) : null}
                                </div>
                            </div>
                            <div>
                                {item.TSNM}
                            </div>
                        </div>

                        <div>
                            <Status dataKey={item.TSST} />
                            <BiDotsVerticalRounded />
                        </div>
                    </StyledTreeItem>
                    {item.Child && <Tree allData={item.Child} expanded={_tree.expandedNodes.includes(item.TSID)} />}
                </>
            ))}
        </div>
    )
}

export default WikiTree;