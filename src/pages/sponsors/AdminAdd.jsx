import {useEffect, useState} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
import { basicAddDB } from "../../utils/actions";
//import media from '../media'
import styled from 'styled-components'
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

	let data = {
		title:formData.get("title"), 
		site:formData.get("site"), 
		thumbnail:formData.get("thumbnail"),
		order: Number.parseFloat(formData.get("order"))
	}

	let addedId = await basicAddDB('sponsors', data)

	return {addedId, data}
}

export default function AdminAdd() {

	
	let {
		sponsors,
		admin,
		indx
	} = useOutletContext()
	
	let [order, setOrder] = useState(0)
	let [index, setIndex] = useState(indx)


	let actionData = useActionData()
	let navigate = useNavigate()

	let orderGap = (e) => {

		let selectedIndx = Number(e.target.selectedIndex)
		
		if(sponsors.length-1 === e.target.value){
			setOrder(Math.round(sponsors[e.target.value].order) + 100)
			
		}else if(e.target.value === 0){
			setOrder(sponsors[0].order ? sponsors[0].order / 2 : 100)
		}
		else{
			
			let beforIndx = selectedIndx-1
			let afterIndx = selectedIndx+1

			setOrder((sponsors[beforIndx].order + sponsors[afterIndx].order) / 2)
		}

		setIndex(selectedIndx)
	}

	useEffect(() => {

		if(actionData?.addedId){
			navigate(`/sponsors`)
		}

	}, [actionData])

	return 	<>	
			{
				admin.status && <Main>
				<h2>ADD NEW SPONSOR</h2>
				<Form method="post" action={`/sponsors/add`}>
					<label> NAME:
						<input
						name="title"
						type="text"
						autoFocus
						/>
					</label>
					<label> SPONSORS URL:
						<input
						name="site"
						type="text"
						/>
					</label>
					<label> THUMBNAIL URL:
						<input
						name="thumbnail"
						type="text"
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
					<input name='order' type='hidden' defaultValue={order} />
					<input type="submit" />
				</Form>
				<BackButton to={"/sponsors"} />
			</Main>
		}
	</>
}