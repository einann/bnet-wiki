import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { MessageToastProps, StyledMessageToastProps } from "./MessageToast.types";
import { TiTick } from "react-icons/ti";
import { MdErrorOutline } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { PiWarning } from "react-icons/pi";
import { WikiContext } from "../../context/WikiContext";

const types = {
    success: {
        bgcolor: "#22bb33",
        icon: <TiTick />,
    },
    error: {
        bgcolor: "#bb2124",
        icon: <MdErrorOutline />,
    },
    info: {
        bgcolor: "#5bc0de",
        icon: <BsInfoCircle />,
    },
    warning: {
        bgcolor: "#f0ad4e",
        icon: <PiWarning />,
    },
    default: {
        bgcolor: "#004a75",
        icon: null,
    }
}

const StyledMessageToast = styled.div<StyledMessageToastProps>((props) => ({
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    position: "absolute",
    left: "50%",
    bottom: "10%",
    transform: "translateX(-50%)",
    width: "300px",
    height: "60px",
    padding: "0.5rem",
    backgroundColor: props.bgcolor,
    color: "#fff",
    zIndex: "50",
    transition: "0.5s",
    borderRadius: "5px",
    cursor: "default",
}));

const StyledMessageToastIcon = styled.div(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
}));

const MessageToast: React.FC<MessageToastProps> = ({
    type,
    message,
}) => {
    if (!type) type = "default"
    const { state: { _global: { toast } }, dispatch } = useContext(WikiContext);
    const toastRef = useRef<HTMLDivElement>(null);
    const onHideToast = (timeout: number) => {
        setTimeout(() => {
            if (toastRef.current) {
                toastRef.current.style.opacity = "0";
            }
        }, timeout);

        setTimeout(() => {
            dispatch({ type: "onShowMessageToast", payload: { visible: false, message: "" } });
        }, timeout + 250);
    }

    useEffect(() => {
        onHideToast(2000);
    }, [toast.visible]);

    return (
        <StyledMessageToast bgcolor={types[type].bgcolor} ref={toastRef} onClick={() => onHideToast(0)}>
            <StyledMessageToastIcon>
                {types[type].icon}
            </StyledMessageToastIcon>
            <span style={{
                overflow: "hidden",
            }}>{message}</span>
        </StyledMessageToast>
    )
}

export default MessageToast;