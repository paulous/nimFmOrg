import React, {useState, useEffect, useCallback, useRef} from 'react'
import styled from "styled-components"
import { FaPlay, FaPause, FaMicrophone} from 'react-icons/fa'

const PlayBtnCont = styled.li`
	background: #c7a4c43b;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
    cursor: pointer;
    min-width: 40px; 
    height: 40px;
	box-shadow: 1px 1px 3px rgba(13,3,15, 0.7);
`
const PlayBtn = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #b595b2;

    ${PlayBtnCont}:hover & {
		color: #fff8c2;
	}
`

export default function Player ({ 
    setPlayerPause, 
    playerPause, 
    url,  
    audioStream, 
    nimfm_url
	}) {

    const [intro, setIntro] = useState(true)

    const lastUrl = useRef('')

    //let stream = useRef(audioStream)

    let playPause = e => {
        e.preventDefault()
        setPlayerPause({pauseplay:!playerPause.pauseplay, btn:true})
    }

    let pausePlay = useCallback(() => {

		let isPlaying = audioStream.currentTime > 0 && 
		!audioStream.paused && 
		!audioStream.ended && 
		audioStream.readyState > audioStream.HAVE_CURRENT_DATA;
        
		if(!isPlaying){
			console.log('url changed in pausePlay audioStream play pause true')
			audioStream.load()             
			audioStream.play().then((e) => {console.log('the end', e)}).catch((e) => console.log('errrrr', e))
			setPlayerPause({pauseplay:true, btn:false})                
		}
		else if(audioStream.ended){
			setPlayerPause({pauseplay:false, btn:false})
		}
		else if(audioStream.paused){
			console.log('load and play in pausePlay', audioStream.src, audioStream.paused)
			url === nimfm_url && audioStream.load()
			audioStream.play()
			setPlayerPause({pauseplay:true, btn:false})
		}
		else{
			console.log('else pause in pausePlay', audioStream.src, audioStream.paused)
			audioStream.pause()
			setPlayerPause({pauseplay:false, btn:false})
		}
		
		lastUrl.current = url

    }, [audioStream, url, setPlayerPause, nimfm_url])

    useEffect(() => {
        //console.log('url changed in url effect in player', url)
		if(url && audioStream.src !== url){

			lastUrl.current = ''
			audioStream.src = url
			pausePlay()
		}
    }, [url, audioStream, pausePlay])

    useEffect(() => {
        //console.log('playerPause called from Player effect')
        if(intro && playerPause.pauseplay) setIntro(false)
        playerPause.btn && pausePlay()
    }, [playerPause, pausePlay, intro])

    useEffect(() => {
        audioStream.addEventListener("ended", () => {
            setPlayerPause({pauseplay:false, btn:false})
        })
    }, [audioStream, setPlayerPause])

    return <>
            {!intro
            ?   <PlayBtnCont onClick={playPause}>
                {
                    playerPause.pauseplay
                    ?   <PlayBtn>
                            <FaPause size={25} color={'#FFF8C2'} />
                        </PlayBtn>
                    :   <PlayBtn style={{marginLeft:'4px'}}>
                            <FaPlay size={25}  />
                        </PlayBtn>
                }
                </PlayBtnCont>
            : <FaMicrophone size={40} color={'#fff8c2'} />
            }
        </>
    
}



