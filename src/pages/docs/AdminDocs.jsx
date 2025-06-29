import {useEffect, useState} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
//import media from '../media'
import { basicUpdateDB } from "../../utils/actions";
import BackButton from '../../components/buttons/BackButton'

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

		input[type="submit"]
		{
			background:rgb(55, 180, 17);
			border-radius:30px;
			font-size:1.5rem;
			cursor: pointer;

			:hover{
				background:rgb(230, 9, 156);
			}
		}
		input, select[type="text"]
		{
			font-size:1.3rem;
		}
		input, select, label{
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

		select{
			padding:10px;
			font-size:1.1rem;
		}

	}
`

export async function actions({ request }) {

	let formData = await request.formData()

	let id = formData.get("_id")
	let data = {
		description:formData.get("description"), 
		url:formData.get("url"),
		order:Number.parseFloat(formData.get("order"))
	}

	let updated = await basicUpdateDB('docs', id, data)
	
	return {updated, data}
}

export default function AdminDocs() {

	let {
		indx,
		docs,
		admin,
	} = useOutletContext()

	let {
		description,
		url,
		order,
		_id
	} = docs[indx]

	let [orders, setOrders] = useState(order)
	let [index, setIndex] = useState(indx)

	let actionData = useActionData()
	let navigate = useNavigate()

	let orderGap = (e) => {

		let selectedIndx = Number(e.target.selectedIndex)
		let beforIndx = selectedIndx-1
		let afterIndx = selectedIndx+1
		
		if(docs.length-1 === selectedIndx){
			setOrders(docs[selectedIndx].order + 100)
			
		}else if(selectedIndx === 0){
			setOrders(docs[0].order / 2)
		}
		else{
			setOrders((docs[beforIndx].order + docs[afterIndx].order) / 2)
		}

		setIndex(selectedIndx)
	}

	useEffect(() => {

		if(actionData?.updated){

			navigate(`/docs`)
		}

	}, [actionData])

	return 	<>
		{
			admin.status && 
			<Main>
				<h2>EDIT: {description}</h2>
				<Form method="post" action={`/docs/admin`}>
					<label> NAME:
						<input
						name="description"
						type="text"
						defaultValue={description}
						autoFocus
						/>
					</label>
					<label> URL:
						<input
						name="url"
						type="text"
						defaultValue={url}
						/>
					</label>
					<input name='_id' type='hidden' defaultValue={_id} />
										<label> PLACEMENT:
					<select
					value={index}
					onChange={orderGap}
					>
					{
						docs.map((s, i) => (
							<option
								key={`sp${i}`}
								value={i}
							>
								{`${i} - ${s.description}`}
							</option>
						))
					}
					</select>
					</label>
					<input name='order' type='hidden' defaultValue={orders} />
					<input name='_id' type='hidden' defaultValue={_id} />
					<input type="submit" />
				</Form>
				<BackButton to={"/docs"} />
			</Main>
		}
	</>
}
