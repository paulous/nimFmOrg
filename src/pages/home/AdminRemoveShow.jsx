import {useEffect, useState} from 'react'
import { useOutletContext, Form , useActionData, useNavigate} from 'react-router-dom'
//import media from '../media'
import styled from 'styled-components'
import BackButton from '../../components/buttons/BackButton'
import { basicRemoveDB } from "../../utils/actions";

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
			position:absolute;
			top:15px;
			left:5vw;
			color:white;
			font-size:1.5rem;
		}		
	}

	h2{
		margin:60px 30px 0;
	}

	form{
		margin:30px;
		padding:30px;

		label{
			display:flex;
			align-items:center;
			flex-wrap:wrap;
			font-size:1.3rem;
			border-radius:30px;
			padding:25px;
			background:rgba(56, 3, 56, 0.7);
			line-height:1.75;

			input[type=submit] {
				font-size:1.3rem;
				padding:15px; 
				background:rgb(173, 14, 14); 
				border:0 none;
				cursor:pointer;
				border-radius: 5px;
				color:white;
			}
			select{
				padding:10px;
				margin:15px;
				font-size:1.1rem;
			}
		}
	}
`

export async function actions({ params, request }) {


		let formData = await request.formData()
		let deleteShowId = formData.get("delete")

		let removed = await basicRemoveDB('shows', deleteShowId)

		return {removed, deleteShowId}
	}

export default function AdminRemoveShow() {

	let [titleChange, setTitleChange] = useState('Permanently DELETE a show')

	let {
		showTitleId,
		admin,
		setAdmin
	} = useOutletContext()

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.removed.documentId === showTitleId){

			navigate(`/program/admin-program`)
		}

	}, [actionData])

  return <Main>
		<h2>DELETE A SHOW FOREVER</h2>
			{
				admin.status && 
				<Form method="delete" action={`/program/admin-program/remove-show`}>
					<label> SELECT A SHOW TO DELETE:
						<select name='delete' onChange={(e) => setTitleChange(e.target.value)} value={titleChange}>
							{	
								showTitleId.map((show,i) => (
									<option 
									key={`kyp${i}`} 
									value={show._id.toString()}
									>
										{show.title}
									</option>
								))
							}
						</select>
						<input type="submit" value="DELETE"/>
					</label>
				</Form>
	
			}
			<BackButton to={'/program/admin-program'} />
	</Main>
}
