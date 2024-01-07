import React from "react";
import styled from "styled-components";
import { TabButtonProps } from "./TabButton.types";
import { Colors } from "../../util/colors";

const StyledTabButton = styled.button(() => ({
    color: Colors.PRIMARY,
    position: "relative",
    backgroundColor: "transparent",
    border: 0,
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    transition: "0.25s",

    "&:hover": {
        backgroundColor: "#DDD",
    }
}));

const StyledTooltip = styled.span(() => ({
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    fontSize: "0.75rem",
    textWrap: "nowrap",
    top: "-1.25rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: Colors.PRIMARY,
    color: "#FFF",
    borderRadius: "5px",
    transition: "0.25s",

    [`${StyledTabButton}:hover &`]: {
        opacity: 1,
        padding: "0.25rem 0.5rem",
    }
}));

const TabButton: React.FC<TabButtonProps> = ({
    children,
    press,
    tooltip
}) => {
    return (
        <StyledTabButton onClick={press}>
            {children}
            {tooltip && (
                <StyledTooltip>
                    {tooltip}
                </StyledTooltip>
            )}
        </StyledTabButton>
    )
}

export default TabButton;