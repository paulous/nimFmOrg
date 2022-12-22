import styled from "styled-components";
import { animated } from "@react-spring/web";

export const Card = styled(animated.img)`
    ${props => props.abs === 'front' && 'position: absolute;'}
    width:100%;
    max-width:500px;
    cursor: pointer;
    will-change: transform, opacity;

    //::before{
        //content:url(${props => props.bgImage});
    //}
`
