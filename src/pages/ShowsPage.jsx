import {useRef, useState} from 'react'
import {Outlet, useParams, useOutletContext, useNavigate} from "react-router-dom"
import styled from 'styled-components'
import media from '../utils/media'

export const ShowsNav = styled.div`
	position:fixed;
	top:50vh;
	//bottom:0;
	left:30px;
	right:30px;
	display:flex;
	align-items:center;
	justify-content:center;
	pointer-events: none;

	nav{
		width:100%;
		display:flex;
		justify-content:space-between;

		span{
			width:90px;
			height:90px;
			display:flex;
			align-items:center;
			justify-content:center;
			border-radius:50%;
			background:rgba(156, 68, 149, 0.8);
			pointer-events:auto;
			cursor: pointer;
			font-size:3rem;
			color:white;

			${media.laptop`
				width:75px;
				height:75px;
				font-size:2rem;
			`}

			${media.phone`
				width:50px;
				height:50px;
				font-size:1.5rem;
			`}
		}
	}

	${media.laptop`
		left:20px;
		right:20px;
	`}

	${media.phone`
		left:15px;
		right:15px;
	`}
`

export default function ShowsPage() {


	let param = useParams()

 	let navigate = useNavigate()

	let {idsDaysTimes} = useOutletContext()
	
	let navShowData = useRef(idsDaysTimes.filter((dup, i, arr) => i === arr.findIndex((obj) => obj.id === dup.id)))
	
	let indx = useRef(navShowData.current.findIndex((obj) => obj.id === param.show))

	let [currentShowIndx, setCurrentShowIndx] = useState(indx.current) 

	const updateShowIndx = (left) => (e) => {
		e.preventDefault()
		
		let csi = currentShowIndx === 0 
			? left ? navShowData.current.length-2 : 1
			: currentShowIndx === navShowData.current.length-1 
				? left ? currentShowIndx -= 1 : 1
				: left 
					? currentShowIndx -= 1 
					: currentShowIndx += 1 

		setCurrentShowIndx(csi) 

		navigate(`/program/show/${navShowData.current[csi].id}`)
	}

    return <>
		<Outlet context={
			{time: currentShowIndx !== -1 
				? navShowData.current[currentShowIndx].time 
				: programColl[selected].hosts[showIndx].time,  
			day: currentShowIndx !== -1 
				? navShowData.current[currentShowIndx].day 
				: programColl[selected].day}
		} />
		<ShowsNav>
			<nav>
				<span onClick={updateShowIndx('left')} >{`<`}</span>
				<span onClick={updateShowIndx('')} >{`>`}</span>
			</nav>
		</ShowsNav>
	</>
}
