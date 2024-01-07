import React, { useContext } from "react";
import WikiTree from "../WikiTree/WikiTree"
import WikiTab from "../WikiTab/WikiTab";
import { WikiContext } from "../../context/WikiContext";
import styled from "styled-components";
import { device } from "../../util/breakpoints";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const StyledWikiContainer = styled.main((props) => ({
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

    [`@media (${device.sm})`]: {
        flexDirection: "column",
    },
}))

const WikiContainer: React.FC = () => {
    const { state: { _global } } = useContext(WikiContext);
    return (
        <div style={{ width: "100%", height: "35rem" }}>
            <StyledWikiContainer>
                <WikiTree />
                <WikiTab />
                {_global.loading && <Loading />}
                {_global.error && <Error />}
            </StyledWikiContainer>
        </div>
    )
}

export default WikiContainer;