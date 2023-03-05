import {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {AudioContext} from "../../utils/AudioState"
import {ShowTimeContext} from "../../utils/ShowTimeState"
import PlayBtn from '../buttons/PlayBtn'
import PlayTime from './PlayTime'

let Main = styled.div`
	display:flex;
	align-items:center;
	position:absolute;
	left:3px;
	bottom:1px;
	z-index:1;
	background:rgba(0,0,0,0.8);
	border-radius:40px;
	margin-right:3px;
	
	a, span{padding:0 15px; color:white;}
`

export default function Player() {

	const {
		togglePlay,
		audioStream,
		playerPause
	} = useContext(AudioContext)

	const {
		currentShow
	} = useContext(ShowTimeContext)

	
  return <Main>
		<PlayBtn
		small={true}
		{...{
			togglePlay,
			playerPause
		}}
		/>
		<Link to={`/program/show/${currentShow.id}`}>{currentShow.title}</Link>
		<PlayTime {...{audioStream}}/>
	</Main>
}
