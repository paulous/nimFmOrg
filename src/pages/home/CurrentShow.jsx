import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import media from '../../utils/media'
import { ShowTimeContext } from "../../utils/ShowTimeState"
import { ChangeChars } from '../../utils/springAnimations'

let Main = styled.div`
	overflow:hidden;
	padding:5px;
	text-align:right;
	cursor: pointer;

	.title-text{	
		position:absolute;
		top:110%;
		left:40%;
		right:60px;
		display:flex;
		align-items:center;
		justify-content:center;
		transform:rotate(-3deg) ;
		font-size:8rem;
		line-height:0.71;
		font-family: 'Londrina Solid', cursive;

		${media.laptop`font-size:7rem; left:10%; right:10px;`}
		${media.phone`font-size:4.5rem; left:0; right:0;`}
	}

	.show-day-time{
		position:absolute;
		top:-30%;
		right:0;
		white-space:nowrap;

		${media.laptop`font-size:2rem;`}
		${media.phone`font-size:1.1rem;`}

	}

	a{color:white};

`
export default function CurrentShow() {

	const {
		currentShow
	} = useContext(ShowTimeContext)

	return <Main>
		<Link to={`/program/show/${currentShow.id}`}>
			<div className='title-text'><ChangeChars text={currentShow.title.toUpperCase()} min={0.2} max={0.8} bg />
				<h2 className='show-day-time'>{currentShow.showDayTime}</h2>
			</div>
		</Link>
	</Main>
}
