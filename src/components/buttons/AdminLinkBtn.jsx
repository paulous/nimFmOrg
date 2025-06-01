import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { GiPirateSkull } from "react-icons/gi";


const Main = styled.div`
	position:${props => props.position ? 'absolute' : 'fixed'};
	bottom:50px;
	right:15px;	
	width:100px;
	height:100px;
	border-radius:50%;
	display:flex;
	align-items:center;
	justify-content:center;
	background:rgba(255, 255, 255, 0.7);
	cursor:pointer;
`

export default function AdminLinkBtn({ admin, link, setAdmin, area, position}){

	let navigate = useNavigate()

	let toggleAdmin = (e) => {
		e.preventDefault()
		navigate(link)
		setAdmin({[area]:!admin})
	}


	return <Main onClick={toggleAdmin} position={position}><GiPirateSkull size={70} />
		</Main>
}