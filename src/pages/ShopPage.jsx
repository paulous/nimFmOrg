
import {useContext, useEffect} from 'react';
import { Outlet, Link, Await, defer, useLoaderData } from 'react-router-dom'
import {Main} from './shopStyles'
import Loader from '../utils/Loader'
import {getShopData} from '../utils/loaders'

export async function loader() {

	return {shopColl:await getShopData()}
}

export default function ShopPage(){

	//const context = useContext(AppContext);
	//const {} = context;

	useEffect(() => {
		//setVerified({...verified, favs:verified.favs.splice(0, 1, 'user.id')})
	}, [])


	const data = useLoaderData()


	return <Main>
			<div>
				<h1 className='title'>THE NIMFM SHOP</h1>
				<h3 className='title-txt'>
					Welcome to the NimFm shopping experience! Here you will find a wide variety of things you don't really need in your life. But hey! Your here, so why not look around, because you never know what you could find. Please shop responsibly.
				</h3>
			</div>
			<div className='items'>
				
					{data.shopColl.map((itm, i) => (
						<Link to={`${i}`} key={`itm${i}`}>
							<div  className='item'>
								<img className='itm-img' src={itm.frontImg} />							
								<h3>{itm.title}	</h3>
								<h3>Price: ${itm.price} AUD</h3>
							</div>
						</Link>
					))}
				
			</div>
			<div className='details-outlet'><Outlet context={[data]}/></div>
		</Main>
}