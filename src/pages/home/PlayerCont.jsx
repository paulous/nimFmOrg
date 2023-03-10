import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from "styled-components"
import media from '../../utils/media'
import Player from './Player'
import PlayerControl from './PlayerControl'
import {AudioContext} from "../../utils/AudioState"
import {ShowTimeContext} from "../../utils/ShowTimeState"


const PlayerWrap= styled.div`
	position: fixed;
    bottom:10px;
    left:5px;
	z-index:200;
    width:auto;
    padding:1px 15px 1px 1px;
	background: rgba(13,3,15,0.9);
	display: flex;
    align-items: center;
	border-radius: 23px;
	box-shadow: 1px 1px 5px rgba(13,3,15, 0.7);

    ${media.phone`
    flex-direction:column-reverse;
	align-items: flex-start;
    justify-content:space-evenly;
    border-radius:0; 
    bottom:0;
    left:0;
    width:100vw;
    padding:5px;
	box-shadow: -3px -3px -5px rgba(13,3,15, 0.9);
    `
    }
`
const CurrentShow = styled.div`
    position:relative;
	display:flex; 
	flex-direction:row; 
	flex-grow:1;
	align-items:baseline;
	margin-left:10px;

    ${media.phone`
		flex-direction:column; 
		align-items:center;
        justify-content:center;
        margin-bottom:7px;
	`}
`
const CurrentShowTxt = styled.p`
	font-size:1rem;
	color:#fff8c2;
    text-shadow: 0px 2px 2px rgba(13,3,15,1);
    margin-right:10px;
    font-family:Arial, Helvetica, sans-serif;


	&:hover {
		color: #fff;
	}
	
    ${media.phone`
        margin-top:10px;
	`}
`
const NoBreak = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;

    ${media.phone`
		margin-top:10px;
	`}
`

let nimfm_url = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'

export default function PlayerCont () {

	const {
		audioStream, 
		playerUrl:{
			url,
			http_url,
			title,
			currPath
		}, 
		playerPause, 
		setPlayerPause
	} = useContext(AudioContext)

	const {
		currentShow
	} = useContext(ShowTimeContext)

    //const [currentShow, setcurrentShow] = useState(currentShow)

    //useEffect(() => {
		//setcurrentShow(currentShow)
    //}, [currentShow])

    let isPodcast = currentShow.started && url !== nimfm_url && title

    return(
        <PlayerWrap>
            <NoBreak>
                <Player {...{
                    setPlayerPause, 
                    playerPause, 
                    url, 
                    http_url,
                    nimfm_url,
                    audioStream
                }} />
                <Link to={
                        currentShow.started
                        ? `${url === nimfm_url || !url 
                            ? currentShow.show_id 
                            : currPath}` 
                        : '#'
                    }
                >
                    <CurrentShow>                    
                        <CurrentShowTxt>
                        {
                            isPodcast ? title : `NimFM ~ ${currentShow.title || 'Loading...'}`
                        }
                        </CurrentShowTxt>
                    </CurrentShow>
                </Link>
            </NoBreak>
            <PlayerControl {...{audioStream, isPodcast}} />
        </PlayerWrap>
    )
}



