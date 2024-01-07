import React from "react";
import styled from "styled-components";
import { StatusProps } from "./Status.types";
import { StatusColors } from "../../util/colors";

const StyledStatus = styled.div<StatusProps<string>>((props) => ({
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    backgroundColor: StatusColors[props.dataKey],
    cursor: "pointer",
}));

const Status: React.FC<StatusProps<string>> = ({
    dataKey
}) => {
    return (
        <StyledStatus dataKey={dataKey} />
    )
}

export default Status;