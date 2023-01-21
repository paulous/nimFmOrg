import {useEffect} from 'react'
import { useOutletContext, Form , useActionData, useNavigate, Link} from 'react-router-dom'
import { addShow, removeShow } from '../../utils/actions'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'
//import media from '../media'
import styled from 'styled-components'

const Main = styled.div`
	position:fixed;
	top:44px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	flex-flow:column;
	align-items:center;
	//justify-content:center;
	padding-top:clamp(50px, 3vw, 100px);
	background-image: radial-gradient(circle at top right, rgba(64, 9, 119, 0.694) 0%, rgba(64, 9, 119, 0.749) 48%,rgba(72,7,149, 0.47) 48%, rgba(72,7,149, 0.47) 53%,rgba(109,5,178, 0.45) 53%, rgba(109,5,178, 0.45) 56%,rgba(145,2,208, 0.48) 56%, rgba(145,2,208, 0.48) 69%,rgba(181,0,237, 0.44) 69%, rgba(181,0,237, 0.44) 100%), 
	linear-gradient(0deg, rgba(119, 8, 119, 0.504) 15%, rgba(53, 3, 53, 0.864) 95%);
	overflow-y:auto;

	.back-btn{
		display:flex;
		width:100%;
		
		a{
			position:fixed;
			top:75px;
			left:5vw;
			color:white;
			font-size:1.5rem;
		}		
	}

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

		input[type=submit] {
			font-size:1.3rem;
			padding:15px; 
			background:rgb(6, 239, 122); 
			border:0 none;
			cursor:pointer;
			border-radius: 5px;
			color:white;
		}
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
console.log(request, request.type)
	let formData = await request.formData()

	let addNewItem = {
		name:formData.get("name"), 
		description:formData.get("description"), 
		sku:params.shop, 
		unit_amount:{
			currency_code: "AUD",
			value: formData.get("amount")
		},
		
		quantity:formData.get("quantity"),
		images:formData.getAll("images"),
		status:{
			active: formData.get("active"), 
			discount:formData.get("discount"),
			promotion:formData.get("promotion")
		}
	} 

	let result = {}//await addShow(params, addNewShow)

	return {result, addNewItem}
}

export async function loader({ params }) {

	return {showData: 'hello'}
}

export default function AdminAddItem() {
	let {
		itemData,
		admin,
		setAdmin
	} = useOutletContext()

	let {		
		name, 
		description, 
		sku, 
		unit_amount:{
			value
		}, 
		quantity, 
		images
	} = itemData

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.result.modifiedCount === 1){

			navigate(`/admin-program`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

  return <>
  		{
			admin.status &&
			<Main>
				<Form method="post" action={`/admin-shop/admin-add-item`}>
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
			<input type="submit" />
					<input type="submit" value='CREATE SHOW' />
				</Form>
			</Main>		
		}
	</>
}
