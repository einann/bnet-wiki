import React from "react";
import styled from "styled-components";
import { StatusProps } from "./Status.types";
import { StatusColors } from "../../util/colors";

const StyledStatus = styled.div<StatusProps<string>>((props) => ({
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    backgroundColor: StatusColors[props.dataKey],
    cursor: "pointer",

    "&:hover": {
        opacity: 0.9,
    }
}));

const Status: React.FC<StatusProps<string>> = ({
    dataKey
}) => {
    return (
        <StyledStatus dataKey={dataKey} />
    )
}

export default Status;