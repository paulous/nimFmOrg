import {useEffect} from 'react'
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
		order:formData.get("order")
	}

	let addedId = await basicAddDB('sponsors', data)

	return {addedId, data}
}

export default function AdminAdd() {

	let {
		indx,
		setIndx,
		sponsors,
		admin,
		setAdmin
	} = useOutletContext()

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.addedId){

			navigate(`/sponsors`)
		}else{
			console.log('nothing was updated')
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
					name={'order'}
					value={indx}
					onChange={(e) => setIndx(e.target.value)}
					>
					{
						sponsors.map((s, i) => (
							<option
								key={`sp${i}`}
								value={s.order}
							>
								{s.order}
							</option>
						))
					}
					</select>
					</label>
					<input type="submit" />
				</Form>
				<BackButton to={"/sponsors"} />
			</Main>
		}
	</>
}