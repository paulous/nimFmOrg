import {useSpring, animated} from '@react-spring/web'
import {Main, Circle} from './loaderStyles'

export default function Loader (props) {

    const {x} = useSpring({ 
        x: 0, 
        from: {x:-300}, 
        config:{ mass: 1, tension: 15, friction: 5, clamp:true }, 
        reset:true, 
        loop:{reverse:true} 
    })

    return (
        <Main>
                <Circle>
                    <animated.svg viewBox="-1 5 88.99 77.47" width="100%" height="100%" strokeDashoffset={x.to(x => (x))}>
                        <path fill="rgba(239,41,41,0.3)" stroke="red" strokeWidth="2px" strokeDasharray = '300'
                        d="M63.75 6C75.49 6 85 15.88 85 28.06C85 61.8 42.5 78.54 42.5 79.47C42.5 79.47 42.5 79.47 42.5 79.47C42.5 78.54 0 61.8 0 28.06C0 15.88 9.51 6 21.25 6C32.99 6 42.5 14.65 42.5 26.84C42.5 14.66 52.01 6 63.75 6Z" 
                        />
                    </animated.svg>
                </Circle>
        </Main>
    )
}