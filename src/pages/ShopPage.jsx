import {useContext} from 'react';
import { Outlet, Link, useLoaderData } from 'react-router-dom'
import {AdminContext} from "../utils/AdminState"
import {Main} from './shopStyles'
//import Loader from '../utils/Loader'
import {getShopData} from '../utils/loaders'

export async function loader() {

	return {shopColl:await getShopData()}
}

export default function ShopPage(){

	const {
		admin, 
		setAdmin
	} = useContext(AdminContext)

	const {shopColl} = useLoaderData()

	return <Main>
			<div>
				<h1 className='title'>THE NIMFM SHOP</h1>
				<h3 className='title-txt'>
					Welcome to the NimFm shopping experience! Here you will find a wide variety of things you don't really need in your life. But hey! Your here, so why not look around, because you never know what you could find. Please shop responsibly.
				</h3>
			</div>
			<div className='items'>
				
					{shopColl.map((itm, i) => (
						<Link to={`${i}`} key={`itm${i}`}>
							<div  className='item'>
								<img className='itm-img' src={itm.images[0]} />							
								<h3>{itm.name}</h3>
								<h3>Price: ${itm.unit_amount.value} AUD</h3>
							</div>
						</Link>
					))}
				
			</div>
			<div className='details-outlet'><Outlet context={{shopColl,	admin, setAdmin}}/></div>
		</Main>
}