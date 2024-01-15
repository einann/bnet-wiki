import React, { useContext } from "react";
import { MdAttachment, MdDelete, MdModeEdit, MdReply, MdSupervisedUserCircle } from "react-icons/md";
import { styled } from "styled-components";
import { ContextMenuProps } from "./ContextMenu.types";
import { WikiRawDataType } from "../../types/wikidata.types";
import { b64DecodeUnicode } from "../../util/utils";
import { WikiContext } from "../../context/WikiContext";

const StyledMenuItem = styled.li(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    padding: "0.33rem 0.75rem",
    cursor: "pointer",

    "&:hover": {
        backgroundColor: "#EEE",
    }
}))

const ContextMenu: React.FC<ContextMenuProps> = ({
    item
}) => {
    const { dispatch } = useContext(WikiContext);
    const onEditWiki = (item: WikiRawDataType) => {
        const model = {
            TSID: item.TSID,
            MTID: item.MTID,
            TSST: item.TSST,
            PRIO: item.PRIO,
            TSNM: item.TSNM,
            MESSAGE: b64DecodeUnicode(item.MESSAGE),
        };
        dispatch({ type: "setDefaultWikiModel", payload: { model } });
        dispatch({ type: "setEditorVisible", payload: true });
        dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });
    }

    return (
        <>
            <StyledMenuItem onClick={() => onEditWiki(item)}>
                <MdModeEdit />
                <span>Düzenle</span>
            </StyledMenuItem>
            <StyledMenuItem>
                <MdReply />
                <span>Yanıtla</span>
            </StyledMenuItem>
            <StyledMenuItem>
                <MdSupervisedUserCircle />
                <span>Sorumluyu Düzenle</span>
            </StyledMenuItem>
            <StyledMenuItem>
                <MdAttachment />
                <span>Dosya Ekle</span>
            </StyledMenuItem>
            <StyledMenuItem>
                <MdDelete />
                <span>Sil</span>
            </StyledMenuItem>
        </>
    )
}

export default ContextMenu;