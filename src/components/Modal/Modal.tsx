import React, { MouseEventHandler, useCallback, useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ModalProps, StyledModalWrapperProps } from "./Modal.types";
import { WikiContext } from "../../context/WikiContext";
import { MdClose } from "react-icons/md";

const StyledModalOverlay = styled.div(() => ({
    position: "fixed",
    zIndex: "10",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
}));

const StyledModalWrapper = styled.div<StyledModalWrapperProps>((props) => ({
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    minWidth: "30%",
    minHeight: "30%",
    border: "0",
    borderRadius: "5px",
    pointerEvents: props.isLoading ? "none" : "auto",
    opacity: props.isLoading ? 0.5 : 1,
}));

const StyledModalMenuBar = styled.div(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#2f3c48",
    color: "#FFF",
    fontWeight: "bold",
    borderRadius: "5px 5px 0 0",
}));

const StyledModalCloseButton = styled.button(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "0.25rem",
    cursor: "pointer",
    border: "0",
    padding: "0.25rem 0.5rem",
    background: "transparent",
    color: "#FFF",
    borderRadius: "5px",
    transition: "0.25s",

    "&:hover": {
        backgroundColor: "#3c4d5d",
    }
}))

const Modal: React.FC<ModalProps> = ({
    children,
}) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const { state: { _global: { modal, loading } }, dispatch } = useContext(WikiContext);

    const onDismiss = useCallback(() => {
        dispatch({ type: "onShowModal", payload: { visible: false, header: "", children: null } });
    }, [modal.visible]);

    const onHideModal: MouseEventHandler = useCallback((e) => {
        if (e.target == overlay.current) {
            if (onDismiss) onDismiss();
        }
    }, [onDismiss, overlay, wrapper]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key == "Escape") onDismiss();
    }, [onDismiss]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <StyledModalOverlay
            ref={overlay}
            onClick={onHideModal}
        >
            <StyledModalWrapper ref={wrapper} isLoading={loading}>
                <StyledModalMenuBar>
                    <span style={{ pointerEvents: "none" }}>{modal.header}</span>
                    <StyledModalCloseButton onClick={onDismiss}>
                        <span>Kapat</span>
                        <MdClose />
                    </StyledModalCloseButton>
                </StyledModalMenuBar>
                {children}
            </StyledModalWrapper>
        </StyledModalOverlay>
    )
}

export default Modal;