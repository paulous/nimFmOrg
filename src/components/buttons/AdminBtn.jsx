import styled from 'styled-components'

const Main = styled.div`		
	position:absolute;
	bottom:15px;
	right:30px;
	width:100px;
	height:100px;
	border-radius:50%;
	display:flex;
	align-items:center;
	justify-content:center;
	background:rgba(255, 255, 255, 0.7);
	cursor:pointer;
`

export default function AdminBtn({admin, setAdmin, section}){


	return <Main onClick={() => setAdmin(section)}>
		{admin.program ? <p>on</p> : <p>off</p> }
	</Main>
}