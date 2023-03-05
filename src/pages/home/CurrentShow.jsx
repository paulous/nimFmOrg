import {useContext} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import media from '../../utils/media'
import {ShowTimeContext} from "../../utils/ShowTimeState"
import { ChangeChars } from '../../utils/springAnimations'

let Main = styled.div`
	position:absolute;
	bottom:60px;
	left:40%;
	right:60px;
	display:flex;
	align-items:center;
	justify-content:center;
	transform:rotate(-3deg) ;
	font-size:8rem;
	line-height:0.71;
	font-family: 'Londrina Solid', cursive;
	overflow:hidden;
	padding:5px;
	text-align:right;
	min-height:300px;
	cursor: pointer;

	a{color:white};

	${media.laptop`font-size:7rem;  left:20%; right:10px;`}
	${media.phone`font-size:6rem; left:10%; right:0; bottom:100px;`}
`
export default function CurrentShow() {

	const {
		currentShow
	} = useContext(ShowTimeContext)
	
  return <Main>
		<Link to={`/program/show/${currentShow.id}`}>
			<ChangeChars text={currentShow.title.toUpperCase()} min={0.2} max={0.8} bg />
		</Link>
	</Main>
}
