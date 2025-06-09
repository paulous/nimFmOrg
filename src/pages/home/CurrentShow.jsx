import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import media from '../../utils/media'
import { ShowTimeContext } from "../../utils/ShowTimeState"
import { ChangeChars } from '../../utils/springAnimations'

let Main = styled.div`
	padding:5px;
	margin-top:20px;
	cursor: pointer;
	display:flex;
	align-items:flex-end;
	justify-content:flex-end;

	${media.laptop`margin-top:15px;`}
	${media.phone`margin-top:10px;`}

	.title-text{	
		position:absolute;
		right:60px;
		max-width:60%;
		text-align: end;
		transform:rotate(-3deg);
		font-size:8rem;
		line-height:0.71;
		font-family: 'Londrina Solid', cursive;

		${media.laptop`font-size:7rem; max-width:75%;`}
		${media.phone`font-size:4.5rem; max-width:90%; right:10px;`}
	}

	.show-day-time{
		white-space:nowrap;
		margin-bottom:15px;

		${media.laptop`font-size:1.7rem;`}
		${media.phone`font-size:1.3rem; margin-bottom:10px;`}
	}

	a{color:white};

`
export default function CurrentShow() {

	const {
		currentShow
	} = useContext(ShowTimeContext)

	return <Main>
		<Link to={`/program/show/${currentShow.id}`}>
			<div className='title-text'>
				<h2 className='show-day-time'>{currentShow.showDayTime}</h2>
				<ChangeChars text={currentShow.title.toUpperCase()} min={0.2} max={0.8} bg />
			</div>
		</Link>
	</Main>
}
