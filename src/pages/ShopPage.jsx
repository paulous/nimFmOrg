import {useContext, useState} from 'react';
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom'
import {AdminContext} from "../utils/AdminState"
import {Main} from './shopStyles'
//import Loader from '../utils/Loader'
import AdminNav from '../components/AdminNav';
import {getShopData} from '../utils/loaders'

export async function loader() {

	return  { shopColl: await getShopData() };
}

export default function ShopPage(){

	const [itmIndx, setItmIndx] = useState(0)

	const {
		admin, 
		setAdmin
	} = useContext(AdminContext)

	const {shopColl} = useLoaderData()

	const navigate = useNavigate()

	let selectedItem = (indx) => (e) => {
		e.preventDefault()
		setItmIndx(indx)
		let itm = shopColl[indx]
		navigate(`${itm._id}`)
	}

	return <Main>
			<div>
				<h1 className='title'>THE NIMFM SHOP</h1>
				{
					admin.status && <AdminNav {...{navigate, add:'admin-add-item', remove:'admin-remove-item'}} />
				}
				<h3 className='title-txt'>
					Welcome to the NimFm shopping experience! Here you will find a few things you don't really need. So why not look around, because you never know what you could find. Please shop responsibly.
				</h3>
			</div>
			<div className='items'>
					{
						shopColl?.map((itm, i) => (
							<div onClick={selectedItem(i)} key={`itm${i}`}>
								<div  className='item'>
									<img className='itm-img' src={itm?.images[0]} />							
									<h3>{itm?.name}</h3>
									<h3>Price: ${itm?.unit_amount.value} AUD</h3>
								</div>
							</div>
						))
					}				
			</div>
			<div className='details-outlet'><Outlet context={{item:shopColl[itmIndx], shopColl, admin, setAdmin}}/></div>
		</Main>
}