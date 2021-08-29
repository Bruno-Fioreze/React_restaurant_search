import { Height } from "node_modules/@material-ui/icons/index";
import React from "react";
import styled, { keyframes } from "styled-components";

const KeyFremeLoading = keyframes`
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

const LoadingSkeleton = styled.div`
    background-color: gray;
    border-radius: 6px;
    margin-bottom: 10px;
    min-width: ${(props) => props.width};
    min-heigth: ${(props) => props.heigth};
    animation: ${KeyFremeLoading} 500ms infinite alternate;
`;

export default ([width, heigth]) => <LoadingSkeleton width={width} heigth={heigth} />