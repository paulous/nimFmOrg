import React from 'react'
import styled from 'styled-components'

export const BtnCircle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:${props => props.size};
    height:${props => props.size};
    background:${props => props.bg};
    border-radius:50vw;
    cursor:pointer;
    user-select: none;
    color:#2A2A2A;

    &:hover{
        background:#4E9A06;
        color:white;
    }
` 

export default function CircleBtn (props) {

    return (
        <BtnCircle onClick={props.click} bg={props.bg} size={props.size}>{props.icon}</BtnCircle>
    )
}



