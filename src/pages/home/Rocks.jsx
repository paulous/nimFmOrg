import React, {useMemo, useEffect} from 'react'
import styled from 'styled-components'
import {animated, useSpring} from '@react-spring/web'
import media from '../../utils/media'
import StarsSvg from './StarsSvg'
import ShootingStarSvg from './ShootingStarsSvg'

let pos = `    
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    `
const RockWrapper = styled(animated.div)`
    ${pos}
    display:flex;
    align-items:flex-end;
    justify-content:center;
    bottom:-1px;
` 
const GreenRocks = styled(animated.img)`
    width:100%;
    height:auto;
	overflow:hidden;

    ${media.laptopL`width: 100%; margin-bottom:18%;`}
    ${media.laptop`width: 120%; margin-bottom:4%;`}
    ${media.tablet`width: 200%; margin-bottom:6%;`}
    ${media.phone`width: 200%; margin-bottom:10%;`}
    ${media.mobileS`width: 150%; margin-bottom:22%;`}

    /*landscape */
    @media screen and (orientation:landscape){
        margin-bottom:0;
    }
` 
const Grad = styled.div`
    ${pos}
    background:linear-gradient(-10deg, rgba(173,127,168,1) 0%, rgba(31,16,22,0.7) 55%) center center;
    background-position: bottom;
` 
const GradBottom = styled.div`
    ${pos}
    background:linear-gradient(-5deg, rgba(13,13,13,1) 10%, rgba(31,16,22,0) 35%) center center;
    background-position: bottom;

    ${media.phone`background:linear-gradient(-5deg, rgba(13,13,13,1) 8%, rgba(31,16,22,0) 35%) center center;`}
` 
const GradFront = styled.div`
    ${pos}
    background: rgb(173,127,168);
    background: linear-gradient(-10deg, rgba(173,127,168,0) 0%, rgba(173,127,168,0) 38%, rgba(173,127,168,0.19717467064950978) 49%, rgba(173,127,168,0) 64%, rgba(173,127,168,0) 100%);
` 

export default function Rocks(){
    const MemoStars = useMemo(() => (<StarsSvg />), [])
    const MemoShootingStars = useMemo(() => (<ShootingStarSvg />), [])

    
    const [bgSpring, setBgSpring] = useSpring(() => ({
            transform:'translate3d(0, 400px, 0)', 
            immediate: true
    }))

    useEffect(() => {
        setBgSpring.start(() => ({
            transform:'translate3d(0, 0, 0)',
            config:{ mass: 1, tension: 100, friction: 50}
        }))
    }, [setBgSpring])

    return <>
                <Grad />
                {MemoShootingStars}
                {MemoStars}
                <RockWrapper style={bgSpring}>
                    <GreenRocks src={'/assets/header/rocks.gif'} />
                    <GradFront />
                    <GradBottom />
                </RockWrapper>
            </>
}