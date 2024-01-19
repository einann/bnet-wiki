import React, { FormEvent, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { MdAttachment } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { Colors } from "../../util/colors";
import Status from "../Status/Status";
import Prio from "../Prio/Prio";
import { WikiContext } from "../../context/WikiContext";
import StatusMenu from "../StatusMenu/StatusMenu";
import PrioMenu from "../PrioMenu/PrioMenu";
import { addWiki } from "../../service/service";
import MessageToast from "../MessageToast/MessageToast";
import FileAdd from "../FileAdd/FileAdd";

const StyledQuickWikiCreate = styled.form(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    padding: "0 0.5rem",
    height: "2.5rem",
    backgroundColor: "#f3f3f3",
    borderTop: "1px solid #ddd",
    marginTop: "0.5rem",
}));

const SQWCAddFile = styled.button(() => ({
    border: "0",
    padding: "0.3rem 0.6rem",
    backgroundColor: Colors.PRIMARY,
    color: "#FFF",
    cursor: "pointer",
    borderRadius: "2.5px",
    display: "flex",
    alignItems: "center",

    "&:hover": {
        opacity: 0.9,
    }
}));

const SQWCHeaderInput = styled.input(() => ({
    flex: "1",
    border: 0,
    padding: "0.25rem",

    "&:focus": {
        outline: "none",
    },

    "&::placeholder": {
        color: Colors.PRIMARY,
        opacity: 0.5,
    }
}));

const SQWSendButton = styled.button(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    padding: "0.3rem 0.6rem",
    cursor: "pointer",
    border: 0,
    backgroundColor: Colors.PRIMARY,
    color: "#FFF",
    borderRadius: "2.5px",

    "&:hover": {
        opacity: 0.9,
    }
}));

const QuickWikiCreate: React.FC = () => {
    const { state: { _global, _tab }, dispatch } = useContext(WikiContext);
    const [wikiModel, setWikiModel] = useState(_global.defaultWikiModel.model);
    const qwInputRef = useRef<HTMLInputElement>(null);
    const onAddWiki = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const tsnm = formData.get("tsnm");
        const mtid = _global.selectedNode || " ";

        const { TSST, PRIO } = wikiModel;
        const saveModel = {
            TSST,
            PRIO,
            TSNM: tsnm,
            MTID: mtid,
            TSDATA: "",
            BKTP: _global.bktp_bkid[0],
            BKID: _global.bktp_bkid[1],
            TSTP: _tab.selectedWikiType,
        };

        dispatch({ type: "setLoading", payload: true });
        const response = await addWiki([saveModel]);
        if (response) {
            dispatch({ type: "refresh" });
            setWikiModel({ ...wikiModel, TSNM: "" });
            if (qwInputRef.current) {
                qwInputRef.current.value = "";
            }
        }
        else {
            dispatch({ type: "setLoading", payload: false });
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "error", message: "Bir hata meydana geldi." } });
        }
    }

    const onChangeStatus = (TSST: string) => {
        setWikiModel({ ...wikiModel, TSST });
        dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });
    }

    const onChangePrio = (PRIO: string) => {
        setWikiModel({ ...wikiModel, PRIO });
        dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });
    }

    const onOpenStatusMenu = (e: React.MouseEvent) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !_global.popover.visible,
                expandUpside: true,
                child: <StatusMenu change={onChangeStatus} />
            }
        });
    }

    const onOpenPrioMenu = (e: React.MouseEvent) => {
        dispatch({
            type: "onShowPopover", payload: {
                posX: e.clientX,
                posY: e.clientY,
                visible: !_global.popover.visible,
                expandUpside: true,
                child: <PrioMenu change={onChangePrio} />
            }
        });
    }

    // const onAddFile = () => {
    //     dispatch({ type: "onShowModal", payload: { visible: true, header: "Dosya Ekle", children: <FileAdd /> } })
    // }

    return (
        <StyledQuickWikiCreate onSubmit={(e: React.FormEvent<HTMLFormElement>) => onAddWiki(e)}>
            {/* <SQWCAddFile type="button" onClick={onAddFile}>
                <MdAttachment />
            </SQWCAddFile> */}

            <SQWCHeaderInput
                placeholder="Wiki başlığı girin..."
                name="tsnm"
                ref={qwInputRef}
            />

            <div onClick={(e) => onOpenStatusMenu(e)}>
                <Status dataKey={wikiModel.TSST} />
            </div>

            <div onClick={(e) => onOpenPrioMenu(e)}>
                <Prio dataKey={wikiModel.PRIO} />
            </div>

            <SQWSendButton>
                <BsSendFill />
                <span>Gönder</span>
            </SQWSendButton>
        </StyledQuickWikiCreate>
    )
}

export default QuickWikiCreate;