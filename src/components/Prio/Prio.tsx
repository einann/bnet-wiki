import React from "react";
import styled from "styled-components";
import { PrioProps } from "./Prio.types";
import { PrioColors } from "../../util/colors";
import { BsFillFlagFill } from "react-icons/bs";

const StyledPrio = styled.div<PrioProps<string>>((props) => ({
    color: PrioColors[props.dataKey],
    cursor: "pointer",

    "&:hover": {
        opacity: 0.9,
    }
}));

const Prio: React.FC<PrioProps<string>> = ({
    dataKey
}) => {
    return (
        <StyledPrio dataKey={dataKey}>
            <BsFillFlagFill />
        </StyledPrio>
    )
}

export default Prio;