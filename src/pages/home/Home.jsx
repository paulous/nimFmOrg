import {useMemo, useContext} from 'react'
import { Center, RainbowCont, RadioCont, RadioTxt, Broadcast } from './homeStyles'
import { FaBroadcastTower } from 'react-icons/fa'
import RainbowSvg from './RainbowSvg'
import Rocks from './Rocks'
import PlayBtn from '../../components/buttons/PlayBtn'
import {AudioContext} from "../../utils/AudioState"

const url = 'https://uk5.internet-radio.com/proxy/nimfm?mp=/stream'
const http_url = 'http://uk5.internet-radio.com:8055/stream?type=http&nocache=327'

export default function Home(){

	const {
		audioStream, 
		playerUrl, 
		playerPause, 
		setPlayerUrl, 
		setPlayerPause
	} = useContext(AudioContext)

    const MemoRocks = useMemo(() => (<Rocks />), [])

    return(
        <>
            {MemoRocks}
            <Center>
                <RainbowCont>
                	<RainbowSvg pause={playerUrl.url === url ? playerPause.pauseplay : false} />
				<div className='btn-position'>
					<PlayBtn
					{...{
						playerUrl,
						setPlayerUrl,
						setPlayerPause,
						playerPause,
						audioStream
					}}
					urls={{url, http_url}}
					/>
				</div>
                </RainbowCont>
            </Center>
            <RadioCont>                                     
                <Broadcast>
                    Broadcasting from Nimbin, NSW, Australia
                    <RadioTxt>102.3</RadioTxt> 
                    <FaBroadcastTower size={40} color={'#fff8c2'} style={{transform:`translateY(5px)`}} />
                </Broadcast>
            </RadioCont>
        </>
    )
}



