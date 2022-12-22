import styled from 'styled-components'
import {useSpring, a} from '@react-spring/web'

const StarCont = styled.div`
    position:absolute; 
	top:0;
	left:0;
	right:0;
	bottom:0;
	overflow:hidden; 
`
const ShootStar = styled(a.div)`
    position:relative;
    width:200px;
`
const ShootStarSvg = styled(a.svg).attrs(props => ({
    xmlns:"http://www.w3.org/2000/svg",
    xmlnsXlink:"http://www.w3.org/1999/xlink",
    width:'99.7',
    height:'1.23',
    viewBox: "0 0 26.4 .327"
}))`
    position:absolute;
    top:0;
	left:0;
`

let rand = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min))
let winWH = [window.innerWidth, window.innerHeight]
let last = 1230

export default function ShootingStarsSvg(){

	const sameRand = (first) => {
		let rn = rand(1000,3000)
		if(!first) return last
		last = rn

		return rn
	}

    const {x, rotate} = useSpring({
        from:{x:rand(0, winWH[0]), rotate:95},
        //to:{x:rand(0, winWH[0]), rotate:rot}, 
        delay:sameRand(true),
        immediate:true,
        loop: () => {
            let posx = rand(0, winWH[0])
            let rotdirLeft = posx > winWH[0]/2 ? true : false
            let rot = rotdirLeft ? rand(95, 160) : rand(5, 70)
            return {
                x:rand(0, winWH[0]), 
                rotate:rot
            }
        }
    })

    const moveStar = useSpring({
        from:{transform:`translateX(0px)`},
        to:{transform:`translateX( ${winWH[0]+winWH[1]}px )`}, 
        config:{ mass: 1, tension: 13, friction: 13},
        delay:sameRand(),
        //immediate:true
        loop:true
    })
          
    return <StarCont>
        <ShootStar style={{x, rotate}}>
            <ShootStarSvg  style={moveStar}>
                <defs>
                    <linearGradient id="stara" x1="3.02" x2="20.1" y1="3.83" y2="3.83" gradientTransform="matrix(1.52 0 0 1 -3 -1.49)" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#edf9ed" stopOpacity="0" offset="0"/>
                        <stop stopColor="#fff" offset="1"/>
                    </linearGradient>
                </defs>
                <g transform="translate(-1.44 -2.18)">
                    <path d="m1.61 2.34h26" fill="none" stroke="url(#stara)" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".327"/>
                </g>
            </ShootStarSvg>
        </ShootStar>
    </StarCont>
}