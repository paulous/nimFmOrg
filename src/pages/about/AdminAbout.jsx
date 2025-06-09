import {useEffect} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import media from '../../utils/media'
import { updateByEqualityDB } from "../../utils/actions";
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

		${media.laptop`
			margin:120px 15px 0;
		`}

		${media.phone`
			margin:100px 5px 0;
		`}
	}

	form{
		display:flex;
		flex-flow:column;
		align-items:flex-end;
		width:100%;
		max-width:1000px;
		margin:30px 0;
		padding:30px;

		${media.laptop`
			margin:20px 0;
			padding:15px;
		`}

		${media.phone`
			margin:2px 0;
			padding:3px;
		`}


		input, textarea, select[type="text"]
		{
			font-size:1.3rem;
		}
		input, textarea, select, label{
			padding:15px;
			margin:15px;
			width:96%;
		}
		label{
			font-size:1.3rem;
			background:rgba(0,0,0,0.2);
			border-radius:30px;
		}
		textarea:focus{
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
	let data = {description:formData.get("about")}
	let updated = await updateByEqualityDB('general',{key:'name', val:'about'}, data)
	
	return {updated, data}
}

export default function AdminAbout() {

	let actionData = useActionData()
	let navigate = useNavigate()

    let {admin, about } = useOutletContext();


	useEffect(() => {

		if(actionData?.updated){

			navigate(`/about`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

	return 	<>
		{
			admin.status && 
			<Main>
				<h2>EDIT: {about.name}</h2>
				<Form method="post" action={`/about/admin`}>
					<label> ABOUT TEXT:
						<textarea
						name="about"
						type="text"
						defaultValue={about.description}
						autoFocus
						rows='13'
						/>
					</label>
					<input type="submit" />
				</Form>
				<BackButton to={"/about"} />
			</Main>
		}
	</>
}
