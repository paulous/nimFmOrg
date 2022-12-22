import React, {useMemo, useEffect} from "react"
import styled from "styled-components"
import { useSpring, animated } from "@react-spring/web"

const StarCont = styled(animated.svg).attrs(({vbx, vby}) => ({
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    width:'100%',
    height:`${vby+400}`,
    viewBox: `0 0 ${vbx} ${vby+400}`,
    preserveAspectRatio:"xMidYMax slice"
}))``
const Circle = styled.circle.attrs(({id, opacity, x, y}) => ({
  r: 1,
  id:`c${id}`,
  fill: 'white',
  style:{
    opacity: `url(${opacity})`,
    transform:`translate3d(${x}px, ${y}px, 0)`,
  }
}))``
const DarkMatter = styled.circle.attrs(({id, opacity, x, y}) => ({
    r: 2,
    id:`c${id}`,
    fill: 'white',
    style:{
        opacity: `url(${opacity})`,
        transform:`translate3d(${x}px, ${y}px, 0)`
    }
}))``

let rand = (min, max, frac) => 
    frac 
    ?   Math.random() * (max - min + 1) + min  
    :   Math.floor(Math.random() * (max - min + 1) + min)

let xy = [window.innerWidth, window.innerHeight]

export default function StarsSvg(){

    let numStars = rand(300,500)
    const memoStars = useMemo(() => ([...Array(numStars)]), [numStars])

    const [spring, setSpring] = useSpring(() => ({
        to:{transform: `translate3d(0px, 0px, 0)`},
        immediate: true,
    }))

    useEffect(() => {
        setSpring.start({
                to:{transform: `translate3d(0, -400px, 0)`},
                immediate: false,
                config:{ mass: 1, tension: 100, friction: 50}
            })
    },[setSpring])

    useEffect(() => {
        setInterval(() => {
            for(let i = 0; i < 3; i++) {
                let rnd = rand(0,numStars-1)
                let elm = document.getElementById(`c${rnd}`)
                let attrGet = elm ? elm.getAttribute("r") : false
                if(attrGet){ 
                    let n = attrGet < 2 ? 2 : 1
                    elm.setAttribute("r", n)
                    setTimeout(() => {
                        attrGet && elm.setAttribute("r", attrGet)
                    }, rand(25,100))
                }   
            }
        }, rand(500,1000))
    },[numStars])

    return <StarCont style={spring} vbx={xy[0]} vby={xy[1]}>
            {memoStars.map((_, i) =>
            i % 20 === 0
            ?   <DarkMatter
                key={i}
                id={i}
                x={rand(0, xy[0])}
                y={rand(0, xy[1]+400)}
                opacity={rand(1,6,true)/10}
                />
                
            :   <Circle
                key={i}
                id={i}
                x={rand(0, xy[0])}
                y={rand(0, xy[1]+400)}
                opacity={rand(1,9,true)/10}
                />
            )}
      </StarCont>
}