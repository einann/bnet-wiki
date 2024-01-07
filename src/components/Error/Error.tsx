import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "../../util/colors";
import { BiRefresh } from "react-icons/bi";
import { WikiContext } from "../../context/WikiContext";

const StyledError = styled.span(() => ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: Colors.SECONDARY,
    fontSize: "1.25rem",
}));

const StyledRefresh = styled.button(() => ({
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0",
    width: "3rem",
    height: "3rem",
    fontSize: "2.5rem",
    color: Colors.SECONDARY,
    cursor: "pointer",
    transition: "1s",
    opacity: 0.6,

    "&:hover": {
        opacity: 1,
        transform: "rotate(360deg)"
    }
}));

const Error: React.FC = () => {
    const { dispatch } = useContext(WikiContext);
    const onRefresh = () => {
        dispatch({ type: "refresh" });
    }
    return (
        <StyledError>
            <span>Bir hata meydana geldi.</span>
            <StyledRefresh onClick={onRefresh}>
                <BiRefresh />
            </StyledRefresh>
        </StyledError>
    )
};

export default Error;