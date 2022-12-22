import {useLoaderData, Outlet } from 'react-router-dom'
import {Main} from './homePageStyles'
import Header from './home/Header'
import BodyOne from './home/BodyOne'

export async function loader() {
	
	return {}
}

export default function HomePage(){


	const data = useLoaderData()
	

	return <Main>
			<div className='box b-0'>
				<Header />
			</div>
			<div className='box b-1'>
				<BodyOne />
			</div>
			<div className='box b-2'></div>
			<div className='box b-3'></div>
			<div className='box b-4'></div>
			<Outlet />
		</Main>
}