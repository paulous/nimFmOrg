import {useState, useEffect} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
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

	.urls{
		display:flex;
		flex-flow:column;
		padding:15px;

		li{
			display:flex;
			justify-content:space-between;

			img{
				width:100px;
				aspect-ratio:1/1;
				object-fit:contain;
			}

			input{
				flex-grow: 1;
				border: none;
				background:rgba(0,0,0,0.2);
				color: white;
			}

			span{align-self: center; padding:0 15px; cursor:pointer;}
		}


		label{
			display:flex;
			flex-wrap:wrap;
			margin:15px 0;
			background:none;
			padding:0;

			span{
				padding: 15px 21px;
				border: 1px solid white;
				border-radius: 15px;
				font-size: 1.1rem;
				height: fit-content;
				align-self:center;
			}

			input{
				flex-grow: 1;
				border:revert;
				background:revert;
				color:revert;
				min-width: 10px;
    			width: fit-content;
			}
		}
	}
`

export async function actions({ params, request }) {

	let formData = await request.formData()

	let data = {
		name:formData.get("name"), 
		description:formData.get("description"), 
		sku:params.shop, 
		unit_amount:{
			currency_code: "AUD",
			value: formData.get("amount")
		},
		
		quantity:formData.get("quantity"),
		stock:formData.get("stock"),
		images:formData.getAll("images"),
		status:{
			active: formData.get("active") ? true : false, // string or null for checkbox
			discount:{status:formData.get("discount") ? true : false},
			promotion:{status:formData.get("promotion") ? true : false}
		},
		tags:formData.get("tags")
	}

	try {

		let request = await fetch('https://ap-southeast-2.aws.data.mongodb-api.com/app/nimfmorg-xkjvc/endpoint/admin_shop', 
		{ 
			method:'POST', 
			headers: {"Content-Type": ["application/json"]}, 
			body:JSON.stringify({data, id:params.shop, type:'UPDATE'})
		})
		
		let response = await request.json()
		return {response, data}
		
	} catch (error) {
		console.log("error updateShow...dude", error)
	}
}

export default function AdminShop() {
	let {
		item:{		
			_id,
			name, 
			description, 
			sku, 
			unit_amount:{
				value
			}, 
			quantity, 
			stock,
			images,
			status:{
				active, 
				discount,
				promotion
			},
			tags
		},
		admin,
		setAdmin
	} = useOutletContext()

	let actionData = useActionData()
	let navigate = useNavigate()

	let [checked, setChecked] = useState({active, discount, promotion})
	let [UrL, setURL] = useState('')
	let [urlArrs, setUrlArrs] = useState({images, tags})

	let addUrl = (urlarr) => (e) => {
		e.preventDefault()
		try{
			new URL(UrL)
			setUrlArrs(state => ({...state, [urlarr]:[...state[urlarr], UrL]}))
			setURL('')
			console.log(UrL)
		}catch{
			console.log('Not a url')
		}
	}
	let rmvUrl = (urlarr, indx) => e => {
		e.preventDefault()
		setUrlArrs(state => ({...state, [urlarr]:urlArrs[urlarr].filter((_,i) => i !== indx)}))
	}

	useEffect(() => {

		if(actionData?.response.modifiedCount === 1){

			navigate(`/shop/${_id.toString()}`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

	return <Main>
		<h2>EDIT: {name}</h2>
		<Form method="post" action={`/shop/${_id.toString()}/admin-update-item`}>
			<label> NAME:
				<input
				name="name"
				type="text"
				defaultValue={name}
				autoFocus
				/>
			</label>
			<label> ADD IMAGES:
				<ul className='urls'>
					{ 											
						urlArrs.images.map((url,i) => 
							<li key ={`im${i}`}>
								<img src={url} />
								<input 
								
								name="images"
								type="url"
								defaultValue={url}
								readOnly={true}
								/>
								<span onClick={rmvUrl('images',i)}>X</span>
							</li>
						)													
					}
					<label>
						<span onClick={addUrl('images')}>ADD URL</span>
						<input 
						type="url"
						placeholder={'Add an image url'}
						onChange={(e) => setURL(e.target.value)}
						value={UrL}
						/>
					</label>
				</ul>
			</label>
			<label> ADD SEARCH TAG WORDS:
				<textarea
				name="tags"
				type="text"
				rows={2}
				defaultValue={tags}
				/>
			</label>
			<label> DESCRIPTION:
				<input
				name="description"
				type="text"
				defaultValue={description}
				/>
			</label>
			<label> SKU:
				<input
				name="sku"
				type="text"
				defaultValue={sku}
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
			<label> STOCK:
				<input
				name="stock"
				type="number"
				defaultValue={stock}
				/>
			</label>
			<label> ITEM OPTIONS:
				<Checkbox 
				name={'active'} 
				value={checked.active}
				checked={checked.active}
				onchange={() => setChecked((state) => ({...state, active:!checked.active}))} 
				/> 
				Active
				<Checkbox 
				name={'discount'} 
				value={checked.discount.status}
				checked={checked.discount.status}
				onchange={() => setChecked((state) => ({...state, discount:{...state.discount, status:!state.discount.status}}))}   
				/> 
				Discount
				<Checkbox
				name={'promotion'} 
				value={checked.promotion.status} 
				checked={checked.promotion.status}
				onchange={() => setChecked((state) => ({...state, promotion:{...state.promotion, status:!state.promotion.status}}))}  
				/> 
				Promotion
			</label>
			<input type="submit" />
		</Form>
		{
			admin.status && 
			<AdminLinkBtn {...{
				admin:admin.shop,
				link:`/shop/${_id.toString()}`, 
				setAdmin, 
				area:'shop'
			}} />
		}
	</Main>
}
