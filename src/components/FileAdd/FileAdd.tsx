import React, { useContext, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClose, MdDelete } from "react-icons/md";
import { styled } from "styled-components";
import { Colors } from "../../util/colors";
import { WikiContext } from "../../context/WikiContext";
import { addStream, addWikiFile } from "../../service/service";
import { FileAddProps, FileListProps } from "./FileAdd.types";
import { FileDataType } from "../../types/wikidata.types";

const StyledFileAddContainer = styled.div(() => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0.25rem",
}));

const StyledFileLabel = styled.label(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "0.5rem",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "0.25rem 0.5rem",
    borderRadius: "5px",
    transition: "0.25s",

    "&:hover": {
        backgroundColor: "#DDD",
    }
}));

const StyledFileBrowseInput = styled.input(() => ({
    opacity: 0,
    position: "absolute",
    zIndex: "-1",
}));

const StyledFileListContainer = styled.div(() => ({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    rowGap: "0.25rem",
    padding: "0.5rem",
}));

const StyledFileListItem = styled.div(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "1rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#EEE",
    borderRadius: "5px",
}));

const StyledFileDeleteButton = styled.button(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: Colors.SECONDARY,
    color: "#FFF",
    cursor: "pointer",
}));

const StyledFileUploadButton = styled.button(() => ({
    display: "flex",
    padding: "0.5rem 0.5rem",
    border: "0",
    borderRadius: "5px",
    background: Colors.PRIMARY,
    color: "#FFF",
    cursor: "pointer",
    transition: "0.25s",

    "&:hover": {
        opacity: "0.9",
    }
}));

const sChars = ['~', '`', '!', '@', '<', '>', '£', '`', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}', '+', '[', ']', '|', '/', '?', ':', ';'];

const FileAdd: React.FC<FileAddProps> = ({
    TSID,
}) => {
    const { state, dispatch } = useContext(WikiContext);
    const [fileList, setFileList] = useState<FileListProps[]>([]);
    const fileInputRef = useRef<any>(null);

    const onSelectFiles = (files: FileList | null) => {
        if (files) {
            const fileArray = Array.from(files);
            if (fileArray.find(item => item.size >= (1024 * 1024))) {
                return dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "warning", message: "Dosya boyutu 1MB'den büyük olamaz." } });
            }
            for (const item of fileArray) {
                for (let i = 0; i <= sChars.length; i++) {
                    if (item.name.includes(sChars[i])) {
                        dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "warning", message: "Özel karakter kullanmayınız." } });
                        return;
                    }
                }
                setFileList(prevFileList => [
                    ...prevFileList,
                    { file: item, status: "idle" },
                ]);
            }
        }
    }
    const onDeleteAllSelected = () => {
        setFileList([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const onRemoveFileFromList = (name: string) => {
        const filteredList = fileList.filter(item => item.file.name !== name);
        setFileList(filteredList);
        if (fileInputRef.current && fileInputRef.current.value.includes(name)) {
            fileInputRef.current.value = "";
        }
    }

    const onUploadFiles = async () => {
        if (fileList.length < 1) {
            return dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "warning", message: "Lütfen dosya seçiniz." } });
        }
        dispatch({ type: "setLoading", payload: true });
        const streamPromises: Promise<false | { fileData: any; fileName: string; }>[] = [];
        fileList.forEach(item => {
            streamPromises.push(addStream(item.file, item.file.name));
        });
        const response = await Promise.all(streamPromises);
        const docs: { BKTP: string; BKID: string; StreamFile: any; DCTP: string; DCNM: string; DCSIZE: string; DCST: string; }[] = [];
        response.forEach(item => {
            if (item) {
                const filePayload = {
                    BKTP: "TSID",
                    BKID: TSID,
                    StreamFile: item.fileData,
                    DCTP: "00010",
                    DCNM: item.fileName,
                    DCSIZE: "0",
                    DCST: "X",
                };
                docs.push(filePayload);
            }
        });
        const res: FileDataType[] = await addWikiFile(docs);
        if (res && res.length) {
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "success", message: "Dosyalar başarıyla eklendi." } });
            dispatch({ type: "onShowModal", payload: { visible: false, header: "", children: null } });
            dispatch({ type: "refresh" });
        }
        else {
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "error", message: "Dosyalar yüklenirken hata meydana geldi." } });
            dispatch({ type: "setLoading", payload: false });
        }
    };

    const onFormatFileSize = (size: number): string => {
        if (size < 1024) {
            return `${size} bytes`;
        }
        else if (size >= 1024 && size < (1024 * 1024)) {
            let [left, right] = (size / 1024).toString().split(".");
            right = right ? right.substring(0, 2) : "0";
            return `${left}.${right} KB`;
        }
        else if (size >= (1024 * 1024)) {
            let [left, right] = (size / (1024 * 1024)).toString().split(".");
            right = right ? right.substring(0, 2) : "0";
            return `${left}.${right} MB`;
        }
        else {
            return size.toString();
        }
    }

    return (
        <StyledFileAddContainer>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <div>
                    <StyledFileLabel htmlFor="upload-files">
                        <BiSearch />
                        <span>Gözat</span>
                    </StyledFileLabel>
                    <StyledFileBrowseInput
                        id="upload-files"
                        type="file"
                        multiple
                        onChange={(e) => onSelectFiles(e.target.files)}
                        ref={fileInputRef}
                    />
                </div>
                <div>
                    <StyledFileLabel onClick={onDeleteAllSelected}>
                        <MdDelete />
                        Tümünü Sil
                    </StyledFileLabel>
                </div>
            </div>

            <StyledFileListContainer>
                {fileList.map(item => (
                    <StyledFileListItem key={item.file.name + "_" + item.file.lastModified}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "0.25rem",
                            flex: 1,
                        }}>
                            <span style={{
                                fontWeight: "bold",
                                color: Colors.PRIMARY,
                            }}>{item.file.name}</span>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                                <span>{item.file.type}</span>
                                <span>
                                    {onFormatFileSize(item.file.size)}
                                </span>
                            </div>
                        </div>
                        <StyledFileDeleteButton onClick={() => onRemoveFileFromList(item.file.name)}>
                            <MdClose />
                        </StyledFileDeleteButton>
                    </StyledFileListItem>
                ))}
            </StyledFileListContainer>

            <div style={{
                alignSelf: "flex-end"
            }}>
                <StyledFileUploadButton onClick={onUploadFiles}>
                    Dosyaları Yükle
                </StyledFileUploadButton>
            </div>
        </StyledFileAddContainer>
    )
}

export default FileAdd;