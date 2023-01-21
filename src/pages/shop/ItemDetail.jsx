import {useParams } from 'react-router-dom'
import {Main} from './itemDetailStyles'
import Slider from '../../components/slider/Slider'
import { useOutletContext, Outlet } from "react-router-dom"
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'

//import { FiPlus, FiHeart } from 'react-icons/fi'

export default function ItemDetail() {

	let {shopColl, admin, setAdmin} = useOutletContext()
    let {item} = useParams()
	
    return <>
		<Main>
			<h2>{shopColl[item].name}</h2>
            <div className='wrapper'>
				<Slider imageArr={shopColl[item].images} >
				</Slider>
				<div className='txt-wrap'>					
					<p>Items in stock: {`(${shopColl[item].stock})`}</p>
					<h3>Price: $ {shopColl[item].unit_amount.value} AUD</h3>	
					<button className='item-btn'>BUY</button>
					<p>{shopColl[item].description}</p>
				</div>
			</div>
			{
				admin.status && 
				<AdminLinkBtn {...{
					admin:admin.shop,
					link:`/shop/${item}/admin-update-item`, 
					setAdmin, 
					area:'shop'
				}} />
			}
        </Main>
		<Outlet context={{shopColl, admin, setAdmin}} />
		</>
}