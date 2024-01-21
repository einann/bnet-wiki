import React, { useContext } from "react";
import { MdAttachment, MdDelete, MdModeEdit, MdReply, MdSupervisedUserCircle } from "react-icons/md";
import { styled } from "styled-components";
import { ContextMenuProps } from "./ContextMenu.types";
import { WikiRawDataType } from "../../types/wikidata.types";
import { b64DecodeUnicode } from "../../util/utils";
import { WikiContext } from "../../context/WikiContext";
import { delWiki } from "../../service/service";
import { defaultWikiCreateModel } from "../../constants/constants";
import FileAdd from "../FileAdd/FileAdd";

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
    const { state, dispatch } = useContext(WikiContext);
    const onEditWiki = (item: WikiRawDataType) => {
        const model = {
            TSID: item.TSID,
            MTID: item.MTID,
            TSST: item.TSST,
            PRIO: item.PRIO,
            TSNM: item.TSNM,
            BKTP: item.BKTP,
            BKID: item.BKID,
            ENDDT: item.ENDDT,
            SQNR: item.SQNR,
            STIT: item.STIT,
            TSTP: item.TSTP,
            TTID: item.TTID,
            TSDATA: b64DecodeUnicode(item.TSDATA),
        };
        dispatch({ type: "setDefaultWikiModel", payload: { model } });
        dispatch({ type: "setEditorVisible", payload: true });
    }

    const onReplyWiki = (item: WikiRawDataType) => {
        const model = Object.assign({}, {
            ...defaultWikiCreateModel,
            MTID: item.TSID,
        });
        dispatch({ type: "setDefaultWikiModel", payload: { model } });
        dispatch({ type: "setEditorVisible", payload: true });
    }

    const onAddFile = (TSID: string) => {
        dispatch({ type: "onShowModal", payload: { visible: true, header: "Dosya Ekle", children: <FileAdd TSID={TSID} /> } });
    }

    const onDeleteWiki = async (TSID: string) => {
        dispatch({ type: "setLoading", payload: true });
        const response = await delWiki([TSID]);
        if (response) {
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "success", message: "Wiki başarıyla silindi." } });
            dispatch({ type: "refresh" });
            if (response.find((item: { DeleteObject: string; }) => item.DeleteObject === state._global.selectedNode)) {
                dispatch({ type: "onCloseTab", payload: TSID });
            }
        }
        else {
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "error", message: "Wiki silinirken bir hata meydana geldi." } });
            dispatch({ type: "setLoading", payload: false });
        }
    }

    return (
        <>
            <StyledMenuItem onClick={() => onEditWiki(item)}>
                <MdModeEdit />
                <span>Düzenle</span>
            </StyledMenuItem>
            <StyledMenuItem onClick={() => onReplyWiki(item)}>
                <MdReply />
                <span>Yanıtla</span>
            </StyledMenuItem>
            {/* <StyledMenuItem onClick={() => onEditResponsiblePerson(item)}>
                <MdSupervisedUserCircle />
                <span>Sorumluyu Düzenle</span>
            </StyledMenuItem> */}
            <StyledMenuItem onClick={() => onAddFile(item.TSID)}>
                <MdAttachment />
                <span>Dosya Ekle</span>
            </StyledMenuItem>
            <StyledMenuItem onClick={() => onDeleteWiki(item.TSID)}>
                <MdDelete />
                <span>Sil</span>
            </StyledMenuItem>
        </>
    )
}

export default ContextMenu;