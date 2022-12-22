import {useParams } from 'react-router-dom'
import {Main} from './itemDetailStyles'
import Slider from '../../components/slider/Slider'
import { useOutletContext } from "react-router-dom";
//import { FiPlus, FiHeart } from 'react-icons/fi'

export default function ItemDetail() {

	let [{shopColl}] = useOutletContext()
    let {indx} = useParams()
    
    return <Main>
					<h2>{shopColl[indx].title}</h2>
            <div className='wrapper'>
				<Slider imageArr={[shopColl[indx].frontImg, shopColl[indx].backImg]} >
				</Slider>
				<div className='txt-wrap'>					
					<p>Items in stock: {`(${shopColl[indx].inStock})`}</p>
					<h3>Price: ${shopColl[indx].price} AUD</h3>	
					<button className='item-btn'>BUY</button>
					<p>{shopColl[indx].description}</p>
				</div>
			</div>
        </Main>
}