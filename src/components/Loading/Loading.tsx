import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Colors } from "../../util/colors";

const spinAnimation = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const animation = () => css`${spinAnimation} 1s infinite steps(10);`;
const x = "8px";

const StyledLoadingContainer = styled.div(() => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999",
}));

const StyledLoading = styled.div`
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    padding: 1px;
    background: conic-gradient(#0000 10%, ${Colors.PRIMARY}) content-box;
    -webkit-mask: 
      repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
      radial-gradient(farthest-side, #0000 calc(100% - ${x} - 1px), #000 calc(100% - ${x}));
    -webkit-mask-composite: destination-in;
    animation: ${animation};
    z-index: 999;
`;

const Loading: React.FC = () => {
  return (
    <StyledLoadingContainer>
      <StyledLoading />
    </StyledLoadingContainer>
  )
};

export default Loading;