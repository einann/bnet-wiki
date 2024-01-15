import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../util/colors";
import { WikiContext } from "../../context/WikiContext";
import { PopoverProps } from "./Popover.types";

const StyledPopover = styled.ul(() => ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    color: Colors.PRIMARY,
    backgroundColor: "#FFF",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    zIndex: "999",
    border: "1px solid #eee",
    padding: 0,
}));

const Popover: React.FC<PopoverProps> = ({
    children,
}) => {
    const { state: { _global: { popover } }, dispatch } = useContext(WikiContext);
    const [height, setHeight] = useState(0);
    const popoverRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    useEffect(() => {
        if (popoverRef.current) {
            const height = popoverRef.current.clientHeight;
            setHeight(height);
        }
    }, [popover]);

    const handleClickOutside = (e: any) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target)) {
            dispatch({ type: "onShowPopover", payload: { posX: 0, posY: 0, visible: false, child: <span /> } });
        }
    };

    return (
        // dinamik değerleri props ile gönderince tüm componentler flicker oluyor.
        <StyledPopover style={{
            top: `${popover.expandUpside ? (popover.posY - height - 15) : (popover.posY - 15)}px`,
            left: `${popover.posX - 175}px`,
        }} ref={popoverRef}>
            {children}
        </StyledPopover>
    )
}

export default Popover;