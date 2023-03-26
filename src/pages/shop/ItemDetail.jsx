import {Main} from './itemDetailStyles'
import Slider from '../../components/slider/Slider'
import { useOutletContext, Outlet } from "react-router-dom"
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'

//import { FiPlus, FiHeart } from 'react-icons/fi'

export default function ItemDetail() {

	let {item, admin, setAdmin} = useOutletContext()
	
    return <>
		<Main>
			<h2>{item.name}</h2>
            <div className='wrapper'>
				<Slider imageArr={item.images} >
				</Slider>
				<div className='txt-wrap'>					
					<p>Items in stock: {item.stock}</p>
					<h3>Price: $ {item.unit_amount.value} AUD</h3>	
					<button className='item-btn'>BUY</button>
					<p>{item.description}</p>
				</div>
			</div>
			{
				admin.status && 
				<AdminLinkBtn {...{
					admin:admin.shop,
					link:`/shop/${item._id.toString()}/admin-update-item`, 
					setAdmin, 
					area:'shop'
				}} />
			}
        </Main>
		<Outlet context={{item, admin, setAdmin}} />
		</>
}