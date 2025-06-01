import { useMemo, useContext } from 'react'
import { Center, RainbowCont, RadioCont, RadioTxt, Broadcast } from './homeStyles'
import { FaBroadcastTower } from 'react-icons/fa'
import RainbowSvg from './RainbowSvg'
import Rocks from './Rocks'
import PlayBtn from '../../components/buttons/PlayBtn'
import { AudioContext } from "../../utils/AudioState"
import CurrentShow from './CurrentShow'//const http_url = 'http://uk5.internet-radio.com:8055/stream?type=http&nocache=327'

export default function Home() {

    const {
        audioStream,
        togglePlay,
        playerPause,
    } = useContext(AudioContext)

    const MemoRocks = useMemo(() => (<Rocks />), [])

    return (
        <>
            {MemoRocks}
            <Center>
                <CurrentShow {...{ audioStream }} />
                <RainbowCont>
                    <RainbowSvg pause={playerPause.pauseplay} />
                    <div className='btn-position'>
                        <PlayBtn
                            {...{
                                togglePlay,
                                playerPause
                            }}
                        />
                    </div>
                </RainbowCont>
            </Center>
            <RadioCont>
                <Broadcast>
                    Nimbin, NSW, Australia
                    <RadioTxt>102.3 FM</RadioTxt>
                    <FaBroadcastTower size={50} color={'#fff8c2'} style={{ transform: `translateY(5px)` }} />
                </Broadcast>
            </RadioCont>
        </>
    )
}



