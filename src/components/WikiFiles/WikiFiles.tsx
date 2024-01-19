import React, { useContext } from "react"
import { WikiFilesProps } from "../WikiTab/WikiTab.types"
import { MdAttachFile, MdDelete } from "react-icons/md"
import { WikiContext } from "../../context/WikiContext"
import { delWikiFile } from "../../service/service"
import styled from "styled-components"

const StyledFileLink = styled.a(() => ({
    display: "flex",
    alignItems: "center",
    color: "#20006b",
    transition: "0.25s",
    textDecoration: "none",

    "&:hover": {
        color: "#3600b3",
        textDecoration: "underline",
    }
}));

const StyledFileDeleteButton = styled.button(() => ({
    border: "0",
    background: "transparent",
    marginTop: "0.25rem",
    color: "#555",
    cursor: "pointer",
    transition: "0.25s",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
        backgroundColor: "#EEE",
        color: "#111",
    }
}));

const WikiFiles: React.FC<WikiFilesProps> = ({
    item,
}) => {
    const { dispatch } = useContext(WikiContext);
    const onDeleteWikiFile = async (DCID: string) => {
        dispatch({ type: "setLoading", payload: true });
        const response = await delWikiFile([DCID]);
        if (response) {
            dispatch({ type: "refresh" });
        }
        else {
            dispatch({ type: "setLoading", payload: false });
            dispatch({ type: "onShowMessageToast", payload: { visible: true, type: "error", message: "Dosya silinirken bir hata meydana geldi." } });
        }
    }
    return (
        <div style={{
            display: item.FILES.length ? "flex" : "none",
            flexDirection: "column",
            marginTop: "0.5rem",
        }}>
            <span style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#e3952f",
                color: "#FFF",
                fontWeight: "bold",
                borderRadius: "5px",
                fontSize: "smaller",
                padding: "",
                width: "4%",
                pointerEvents: "none",
            }}>
                Dosyalar
            </span>

            <div style={{
                display: "flex",
                columnGap: "1rem",
                width: "100%",
                flexWrap: "wrap",
            }}>
                {item.FILES.map(file => (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <StyledFileLink href={`https://ses.detayteknoloji.com/ses_api/streams?fileId=${file.DCID}&fileName=${file.DCNM}`}>
                            <MdAttachFile />
                            <span>{file.DCNM}</span>
                        </StyledFileLink>
                        <StyledFileDeleteButton onClick={() => onDeleteWikiFile(file.DCID)}>
                            <MdDelete />
                        </StyledFileDeleteButton>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WikiFiles;