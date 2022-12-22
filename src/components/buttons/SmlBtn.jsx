import React from 'react'
import styled from 'styled-components'

export const BtnCircle = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:40px;
    height:40px;
    background:#4E9A06;
    border-radius:50vw;
` 
export const Btn = styled.div`
    border-radius:50vw;
    background:#8AE234;
    display: inline-flex;
    align-items:center;
    justify-content:space-around;
    margin:20px;
    color:#2A2A2A;
    filter: drop-shadow(1px 1px 2px rgba(42,42,42,0.3));
    cursor: pointer;
    user-select: none;

    &:hover{
        background:#4E9A06;
        color:white;
    }
` 
export const BtnText = styled.div`
    padding: 10px 20px 10px 10px;
    font-family:Arial, Helvetica, sans-serif;
    //text-shadow: 0px 1px 1px #2A2A2A;
` 
export default function SmlBtn (props) {

    return (
        <Btn onClick={props.click}><BtnCircle>{props.icon}</BtnCircle><BtnText>{props.text}</BtnText></Btn>
    )
}



