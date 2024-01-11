import React, { useState } from "react";
import styled from "styled-components";
import { StyledPopoverProps, PopoverProps } from "./Popover.types";

const StyledPopover = styled.div<StyledPopoverProps>((props) => ({
    position: "absolute",
    display: props.visible ? "flex" : "none",
    width: "5rem",
    height: "5rem",
    backgroundColor: "teal",
    color: "#fff",
    right: "2rem",
}));

const Popover: React.FC<PopoverProps> = ({
    visible
}) => {
    return (
        <StyledPopover visible={visible}>
            asdasdsadsdsd
        </StyledPopover>
    )
}

export default Popover;