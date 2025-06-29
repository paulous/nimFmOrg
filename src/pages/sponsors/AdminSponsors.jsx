import {useEffect, useState} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
import { basicUpdateDB } from "../../utils/actions";
import BackButton from '../../components/buttons/BackButton'
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
		title:formData.get("title"), 
		site:formData.get("site"), 
		thumbnail:formData.get("thumbnail"),
		order:Number.parseFloat(formData.get("order"))
	}

	let updated = await basicUpdateDB('sponsors', id, data)
	
	return {updated, data}
}

export default function AdminSponsors() {

	let {
		indx,
		sponsors,
		admin
	} = useOutletContext()

	let {
		title,
		site,
		thumbnail,
		order,
		_id
	} = sponsors[indx]

	let [orders, setOrders] = useState(order)
	let [index, setIndex] = useState(indx)

	let actionData = useActionData()
	let navigate = useNavigate()

	let orderGap = (e) => {

		let selectedIndx = Number(e.target.selectedIndex)
		let beforIndx = selectedIndx-1
		let afterIndx = selectedIndx+1
		
		if(sponsors.length-1 === selectedIndx){
			setOrders(sponsors[selectedIndx].order + 100)
			
		}else if(selectedIndx === 0){
			setOrders(sponsors[0].order / 2)
		}
		else{
			setOrders((sponsors[beforIndx].order + sponsors[afterIndx].order) / 2)
		}

		setIndex(selectedIndx)
	}

	useEffect(() => {

		if(actionData?.updated){

			navigate(`/sponsors`)
		}

	}, [actionData])

	return 	<>
		{
			admin.status && 
			<Main>
				<h2>EDIT: {title}</h2>
				<Form method="post" action={`/sponsors/admin`}>
					<label> NAME:
						<input
						name="title"
						type="text"
						defaultValue={title}
						autoFocus
						/>
					</label>
					<label> SPONSORS URL:
						<input
						name="site"
						type="text"
						defaultValue={site}
						/>
					</label>
					<label> THUMBNAIL URL:
						<input
						name="thumbnail"
						type="text"
						defaultValue={thumbnail}
						/>
					</label>
					<label> PLACEMENT:
					<select
					value={index}
					onChange={orderGap}
					>
					{
						sponsors.map((s, i) => (
							<option
								key={`sp${i}`}
								value={i}
							>
								{`${i} - ${s.title}`}
							</option>
						))
					}
					</select>
					</label>
					<input name='order' type='hidden' defaultValue={orders} />
					<input name='_id' type='hidden' defaultValue={_id} />
					<input type="submit" />
				</Form>
				<BackButton to={"/sponsors"} />
			</Main>
		}
	</>
}
