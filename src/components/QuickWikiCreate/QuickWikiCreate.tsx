import React from "react";
import styled from "styled-components";
import { MdAttachment } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { Colors } from "../../util/colors";
import Status from "../Status/Status";
import Prio from "../Prio/Prio";

const StyledQuickWikiCreate = styled.div(() => ({
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
}))

const QuickWikiCreate: React.FC = () => {
    return (
        <StyledQuickWikiCreate>
            <SQWCAddFile>
                <MdAttachment />
            </SQWCAddFile>

            <SQWCHeaderInput placeholder="Wiki başlığı girin..." />

            <Status dataKey="0" />

            <Prio dataKey="3" />

            <SQWSendButton>
                <BsSendFill />
                <span>Gönder</span>
            </SQWSendButton>
        </StyledQuickWikiCreate>
    )
}

export default QuickWikiCreate;