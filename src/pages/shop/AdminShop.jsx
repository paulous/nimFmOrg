import {useState, useEffect} from 'react'
import { useOutletContext, Form, useParams , useActionData, useNavigate} from 'react-router-dom'
import { updateShop } from '../../utils/actions'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'
import Checkbox from '../../components/buttons/Checkbox'

//import media from '../media'
import styled from 'styled-components'

const Main = styled.div`
	position:fixed;
	top:45px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	flex-flow:column;
	align-items:center;
	overflow-y:auto;
	background:linear-gradient(0deg, rgba(117, 8, 119, 0.8) 15%, rgba(52, 3, 53, 1) 95%);

	h2{
		margin:60px 30px 0;
	}

	form{
		display:flex;
		flex-flow:column;
		align-items:flex-end;
		width:100%;
		max-width:1000px;
		margin:30px 0;
		padding:30px;


		input, textarea[type="text"]
		{
			font-size:1.3rem;
		}
		input, textarea, label{
			padding:15px;
			margin:15px;
			width:96%;
		}
		label{
			font-size:1.3rem;
			background:rgba(0,0,0,0.2);
			border-radius:30px;
		}
		input:focus{
			background:rgb(255, 254, 219);
		}

	}
`

export async function actions({ params, request }) {

	let formData = await request.formData()

	let updatedItem = {
		name:formData.get("name"), 
		description:formData.get("description"), 
		sku:params.item, 
		unit_amount:{
			currency_code: "AUD",
			value: formData.get("amount")
		},
		
		quantity:formData.get("quantity"),
		images:formData.getAll("images"),
		status:{
			active: formData.get("active") ? true : false, // string or null for checkbox
			discount:{status:formData.get("discount") ? true : false},
			promotion:{status:formData.get("promotion") ? true : false}
		}
	}
	console.log(updatedItem)

	return {}

	//let result = await updateShop(params, updatedItem)

	//return {result, updatedItem}
}

export async function loader({ params }) {

	return {showData: 'hello'}
}

export default function AdminShop() {
	let {
		shopColl,
		admin,
		setAdmin
	} = useOutletContext()

	let actionData = useActionData()
	let navigate = useNavigate()
	let {item} = useParams()

	let {		
		name, 
		description, 
		sku, 
		unit_amount:{
			value
		}, 
		quantity, 
		images,
		status:{
			active, 
			discount,
			promotion
		}
	} = shopColl[item]

	let [checked, setChecked] = useState({active, discount, promotion})

	useEffect(() => {

		if(actionData?.result?.modifiedCount === 1){

			navigate(`/shop/${item}`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

	return <Main>
		<h2>EDIT: {name}</h2>
		<Form method="post" action={`/shop/${item}/admin-update-item`}>
			<label> NAME:
				<input
				name="name"
				type="text"
				defaultValue={name}
				autoFocus
				/>
			</label>
			<label> DESCRIPTION:
				<input
				name="description"
				type="text"
				defaultValue={description}
				/>
			</label>
			<label> AMOUNT:
				<input
				name="amount"
				type="number"
				defaultValue={value}
				/>
			</label>
			<label> QUANTITY:
				<input
				name="quantity"
				type="number"
				defaultValue={quantity}
				/>
			</label>
			<label> ADD IMAGES:
				<textarea
				name="images"
				type="text"
				rows={10}
				defaultValue={images}
				/>
			</label>
			<Checkbox 
			name={'active'} 
			value={checked.active}
			checked={checked.active}
			onchange={() => setChecked((state) => ({...state, active:!checked.active}))} 
			/> Active
			<Checkbox 
			name={'discount'} 
			value={checked.discount.status}
			checked={checked.discount.status}
			onchange={() => setChecked((state) => ({...state, discount:{...state.discount, status:!state.discount.status}}))}   
			/> Discount
			<Checkbox
			name={'promotion'} 
			value={checked.promotion.status} 
			checked={checked.promotion.status}
			onchange={() => setChecked((state) => ({...state, promotion:{...state.promotion, status:!state.promotion.status}}))}  
			/> Promotion
			<input type="submit" />
		</Form>
		{
			admin.status && 
			<AdminLinkBtn {...{
				admin:admin.shop,
				link:`/shop/${item}`, 
				setAdmin, 
				area:'shop'
			}} />
		}
	</Main>
}
