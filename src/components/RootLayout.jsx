import {Outlet, useLoaderData} from 'react-router-dom'
import MainNavigation from './MainNav'
import styled from "styled-components"
import PlayerCont from '../pages/home/PlayerCont'
import {ShowTimeProvider} from '../utils/ShowTimeState'
import {getProgramData} from '../utils/loaders'
import { worldTime } from '../utils/worldTime'

const Nav = styled.div`
	display:flex;
	justify-content:center;
	width:100%;
	position:fixed;
	top:0;
	padding:8px 0 12px;
	background: rgba(0,0,0, 0.5);
`
export async function loader() {
	
	return {wt:await worldTime(), program:await getProgramData()}
}

export default function RootLayout()  {

	const {wt, program} = useLoaderData()

  	return <>
		<ShowTimeProvider {...{wt, program}}>
			<Outlet />
			<PlayerCont />
		</ShowTimeProvider>
  		<Nav>
			<MainNavigation />
		</Nav>
	</>
	
}