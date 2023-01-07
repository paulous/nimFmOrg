import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.div`		
	width:100px;
	height:100px;
	border-radius:50%;
	display:flex;
	align-items:center;
	justify-content:center;
	background:rgba(255, 255, 255, 0.7);
	cursor:pointer;
`

export default function AdminLinkBtn({ admin, adminOn, adminOff, setAdmin, area}){

	let navigate = useNavigate()

	let toggleAdmin = (e) => {
		e.preventDefault()
		navigate(admin ? adminOn : adminOff)
		setAdmin({[area]:!admin})
	}


	return <Main onClick={toggleAdmin}>
		</Main>
}