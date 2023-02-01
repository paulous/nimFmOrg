import React from 'react'
import styled from "styled-components"
import media from '../../utils/media'
import { FaPlay, FaPause} from 'react-icons/fa'

const PlayBtnCont = styled.div`
	background: #c7a4c43b;
    display: flex;
    min-width:45px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	cursor: pointer;
	box-shadow: 1px 1px 3px rgba(13,3,15, 0.7);

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

export default function PlayBtn ({
        setPlayerUrl, 
        urls, 
        setPlayerPause, 
        playerPause,
        small,
        audioStream
    }) {

    let player = e => {
        e && e.preventDefault()
        urls.url === audioStream.src
        ? setPlayerPause({pauseplay:!playerPause.pauseplay, btn:true})
        : setPlayerUrl(urls)
    }

    return(
        <PlayBtnCont onClick={player} small={small}>
            {
                playerPause.pauseplay && urls.url === audioStream.src
                ?   <PlayerBtn>
                        <FaPause size={small ? 25 : 40} color={'#FFF8C2'} />
                    </PlayerBtn>
                :   <PlayerBtn style={{marginLeft: small ? '5px':'9px'}}>
                        <FaPlay size={small ? 25 : 40}  />
                    </PlayerBtn>
            }
        </PlayBtnCont>
    )
}