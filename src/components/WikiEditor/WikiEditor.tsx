import React, { useContext, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';
import Status from '../Status/Status';
import Prio from '../Prio/Prio';
import { MdClose, MdSave } from 'react-icons/md';
import { Colors } from '../../util/colors';
import { WikiContext } from '../../context/WikiContext';
import StatusMenu from '../StatusMenu/StatusMenu';
import PrioMenu from '../PrioMenu/PrioMenu';
import { WikiEditorProps } from './WikiEditor.types';


const StyledWikiEditorOverlay = styled.div(() => ({
    position: "fixed",
    zIndex: "10",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
}))

const StyledWikiEditorWrapper = styled.div(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}));

const StyledWikiEditorContainer = styled.div(() => ({
    display: "flex",
    flexDirection: "column",

}));

const StyledWikiEditorToolbar = styled.div(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.75rem",
    backgroundColor: "#FFF",
    padding: "1rem",
}));

const StyledWikiEditorHeaderInput = styled.input(() => ({
    padding: "0.25rem",
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    flex: "1",

    "&:focus": {
        outline: "none",
    }
}));

const StyledWikiEditorHeaderButton = styled.button(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    padding: "0.33rem",
    backgroundColor: Colors.PRIMARY,
    color: "#FFF",
    border: 0,
    outline: "none",
    cursor: "pointer",
    borderRadius: "2.5px",
    transition: "0.25s",

    "&:hover": {
        opacity: "0.9",
    }
}));

const WikiEditor: React.FC<WikiEditorProps> = ({
    model
}) => {
    const { state: { _global }, dispatch } = useContext(WikiContext);
    const editorRef = useRef<any>(null);
    const tsnmRef = useRef<any>(null);
    const [wikiModel, setWikiModel] = useState(model);

    const onCloseEditor = () => {
        dispatch({ type: "setEditorVisible", payload: false });
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
                child: <PrioMenu change={onChangePrio} />
            }
        });
    }

    const onAddWiki = () => {
        if (!wikiModel.TSNM.trim()) {
            tsnmRef.current.focus();
        }
        else if (!editorRef.current.getContent()) {
            editorRef.current.focus();
        }
        else {
            const content = editorRef.current.getContent();
            const wikiSaveModel = { ...wikiModel, TSDATA: content };
            console.log(wikiSaveModel)
        }
    };

    console.log(wikiModel)

    return (
        <StyledWikiEditorOverlay>
            <StyledWikiEditorWrapper>

                <StyledWikiEditorContainer>
                    <StyledWikiEditorToolbar>
                        <StyledWikiEditorHeaderInput
                            value={wikiModel.TSNM}
                            placeholder="Wiki başlığı girin..."
                            onChange={(e) => setWikiModel({ ...wikiModel, TSNM: e.currentTarget.value })}
                            ref={tsnmRef}
                        />

                        <div onClick={(e) => onOpenStatusMenu(e)}>
                            <Status dataKey={wikiModel.TSST} />
                        </div>

                        <div onClick={(e) => onOpenPrioMenu(e)}>
                            <Prio dataKey={wikiModel.PRIO} />
                        </div>

                        <StyledWikiEditorHeaderButton onClick={onAddWiki}>
                            <MdSave />
                            <span>Kaydet</span>
                        </StyledWikiEditorHeaderButton>

                        <StyledWikiEditorHeaderButton onClick={onCloseEditor}>
                            <MdClose />
                        </StyledWikiEditorHeaderButton>
                    </StyledWikiEditorToolbar>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={wikiModel.TSDATA}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </StyledWikiEditorContainer>

            </StyledWikiEditorWrapper>
        </StyledWikiEditorOverlay>
    );
}

export default WikiEditor;