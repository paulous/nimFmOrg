import styled from "styled-components"
import media from '../../utils/media'
import { FaPlay, FaPause } from 'react-icons/fa'

const PlayBtnCont = styled.span`
	background: #c7a4c43b;
    display: flex;
    min-width:55px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	cursor: pointer;
	box-shadow: 1px 1px 3px rgba(13,3,15, 0.7);
    position: relative;
    box-sizing: border-box;
    
    ${props => props.playLoader && `::before {
        content: "";
        transform:rotate(45deg);
        position: absolute;
        box-sizing: border-box;
        inset:-10px;
        border-radius: 50%;
        border:10px solid rgb(255, 59, 239);
        animation: prixClipFix 2s infinite linear;
    }`}

    @keyframes prixClipFix {
        0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
        25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
        50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
        75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
        100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
    }

    ${props => props.small
        ? media.desktop` width: 55px; height: 55px;`
        : media.desktop` width: 90px; height: 90px;`
    }

`
const PlayerBtn = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #b595b2;

	${PlayBtnCont}:hover & {
		color: #fff8c2;
	}
`

export default function PlayBtn({
    togglePlay,
    playerPause,
    small
}) {

    let player = e => {
        e && e.preventDefault()
        togglePlay()
        //setPlayerPause({pauseplay:!playerPause.pauseplay, btn:true})
    }

    return (
        <PlayBtnCont onClick={player} small={small} playLoader={playerPause.load}>
            {
                playerPause.pauseplay
                    ? <PlayerBtn >
                        <FaPause size={small ? 25 : 40} color={'#FFF8C2'} />
                    </PlayerBtn>
                    : <PlayerBtn style={{ marginLeft: small ? '5px' : '9px' }}>
                        <FaPlay size={small ? 25 : 40} />
                    </PlayerBtn>
            }
        </PlayBtnCont>
    )
}