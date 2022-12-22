import React from 'react'
import styled from "styled-components"
import media from '../../utils/media'

const SeekCont = styled.div`
    position:relative;
    margin: 0 5px;
    display: flex;
    align-items: center;
`
const BufferBar = styled.div`
    position: absolute;
    z-index:-1;
    width:${props => props.bufrd || 0};
    height: 6px;
    border-radius: 3px;
    pointer-events: none;
    background: yellow;
    opacity:0.3;
`
const ProgressBar = styled.div`
    position: absolute;
    z-index:-1;
    width:${props => props.prog || 0};
    height: 6px;
    border-radius: 3px;
    pointer-events: none;
    background: papayawhip;
`
const SeekBar = styled.input`
    appearance: none;
    cursor: pointer;
    width: 100%;

    ${media.phone`
        width: 70vw;
    `
    }

    ::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 3px;
        cursor: pointer;
        pointer-events: none;
        box-shadow: inset 1px 1px 5px rgba(13,3,15,1);
        background: rgba(181,149,178, 0.3);
    }
    &:focus::-webkit-slider-runnable-track {
        background: rgba(181,149,178, 0.4);
        border-radius: 3px;
    }
    &::-webkit-slider-thumb {
        height: 14px;
        width: 14px;
        appearance: none;
        border-radius: 7px;
        background: rgba(181,149,178, 1);
        box-shadow: 3px 0 8px rgba(13,3,15,1);
        margin-top:-4px;
    }
    ::-moz-range-track {
        height: 6px;
        border-radius: 3px;
        width: 100%;
        cursor: pointer;
        pointer-events: none;
        box-shadow: inset 1px 1px 5px rgba(13,3,15,1);
        background: rgba(181,149,178, 0.4);
    }
    &:focus::-moz-range-track  {
        background: rgba(181,149,178, 0.6);
        border-radius: 3px;
    }
    &::-moz-range-thumb {
        height: 14px;
        width: 14px;
        appearance: none;
        border-radius: 7px;
        background: rgba(181,149,178, 1);
        box-shadow: 3px 0 8px rgba(13,3,15,1);
        margin-top:-4px;
    }
    ::-ms-track {
        height: 6px;
        border-radius: 3px;
        width: 100%;
        cursor: pointer;
        pointer-events: none;
        box-shadow: inset 1px 1px 5px rgba(13,3,15,1);
        background: rgba(181,149,178, 0.4);
    }

    ::-ms-fill-lower {
        background: rgba(181,149,178, 0.6);
        border-radius: 3px;
    }
    ::-ms-fill-upper {
        background: rgba(181,149,178, 0.6);
        border-radius: 3px;
    }
    &::-ms-thumb {
        height: 14px;
        width: 14px;
        appearance: none;
        border-radius: 7px;
        background: rgba(181,149,178, 1);
        box-shadow: 3px 0 8px rgba(13,3,15,1);
        margin-top:-4px;
    }
    &:focus::-fill-lower {
        background: rgba(181,149,178, 0.6);
        border-radius: 3px;
    }
    &:focus::-fill-upper {
        background: rgba(181,149,178, 0.6);
        border-radius: 3px;
    }
`

export default function PlayerSeek ({
    audioStream, 
    buffered, 
    progress
}) {

    let updateCurrentTime = e => {
        e.preventDefault()        
        audioStream.currentTime = audioStream.duration * (e.target.value / 100); 
    }

    return(
        <SeekCont>
            <SeekBar 
            type="range" 
            min={0} 
            max={100} 
            value={audioStream.currentTime * (100 / audioStream.duration)}
            onChange={updateCurrentTime}
            step={1}
            />
            <BufferBar bufrd={buffered} />
            <ProgressBar prog={progress} />
        </SeekCont>
    )
}



