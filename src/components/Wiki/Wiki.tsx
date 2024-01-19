import React from "react";
import { createGlobalStyle } from "styled-components";
import { WikiProps } from "./Wiki.types";
import { WikiProvider } from "../../context/WikiContext";
import WikiContainer from "../WikiContainer/WikiContainer";
// @ts-ignore
import Quicksand from "../../asset/fonts/Quicksand.woff2";



const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Quicksand';
        src: url('${Quicksand}') format('opentype');
    }
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-family: 'Quicksand', sans-serif;
        font-weight: 300;
        font-size: 0.8rem;
    }
    body ::-webkit-scrollbar {
        border-radius: 10px;
        width: 10px;
    }
    body ::-webkit-scrollbar-thumb {
        background: #ccc !important;
        border-radius: 10px;
    }
    .tox-tinymce {
        border: 0 !important;
        border-radius: 0 !important;
    }
    .wiki-content-container > p {
        margin: 0;
    }
`;

const Wiki: React.FC<WikiProps> = ({
    BKTP,
    BKID
}) => {
    return (
        <WikiProvider BKTP={BKTP} BKID={BKID}>
            <GlobalStyle />
            <WikiContainer/>
        </WikiProvider>
    )
}

export default Wiki;