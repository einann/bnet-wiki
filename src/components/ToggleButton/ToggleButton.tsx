import React from "react";
import styled from "styled-components";
import { Colors } from "../../util/colors";
import { ToggleButtonProps } from "./ToggleButton.types";

const StyledToggleButton = styled.div(() => ({
    display: "flex",
    alignItems: "center",
}));

const HiddenRadioButton = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    z-index: -1;
`;

const StyledLabel = styled.label(() => ({
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    border: "1px solid #ccc",
    borderRadius: "0.25rem",
    transition: "background-color 0.25s, color 0.25s, border 0.25s",

    "&:hover": {
        backgroundColor: "#DDD",
    },

    [`${HiddenRadioButton}:checked + &`]: {
        backgroundColor: Colors.PRIMARY,
        borderColor: Colors.PRIMARY,
        color: "#FFF",
    }
}));

const ToggleButton: React.FC<ToggleButtonProps<string>> = ({
    dataKey,
    text,
    checked,
    change,
}) => {
    return (
        <StyledToggleButton>
            <HiddenRadioButton id={`toggle-btn-${dataKey}`} checked={checked} onChange={() => change(dataKey)} />
            <StyledLabel htmlFor={`toggle-btn-${dataKey}`}>
                {text}
            </StyledLabel>
        </StyledToggleButton>
    )
}

export default ToggleButton;