import {useEffect, useState} from 'react'
import { useOutletContext, Form , useActionData, useNavigate, Link} from 'react-router-dom'
import { removeSponsors } from '../../utils/actions'
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
		width:100%;
		max-width:1000px;
		margin:30px;
		padding:30px;

		label{
			display:flex;
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
				flex-grow:1;
				min-width:200px;
			}
		}
	}
`

export async function actions({ request }) {


		let formData = await request.formData()

		let deleteSponsorId = formData.get("delete")
		console.log(deleteSponsorId)

		let result = {}//await removeSponsors(deleteSponsorId)

		return {result}
}

export default function AdminRemove() {

	let [titleChange, setTitleChange] = useState('Permanently DELETE a sponsor')

	let {
		sponsors,
		admin,
		setAdmin
	} = useOutletContext()

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.result.modifiedCount === 1){

			navigate(`sponsors/admin`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

  return <Main>
		<h2>REMOVE A SPONSOR</h2>
			{
				admin.status && 
				<Form method="delete" action={`/sponsors/remove`}>
					<label> SELECT ITEM TO DELETE:
						<select name='delete' onChange={(e) => setTitleChange(e.target.value)} value={titleChange}>
							{	
								sponsors.map((s,i) => (
									<option 
									key={`sp${i}`} 
									value={s._id.toString()}
									>
										{s.title}
									</option>
								))
							}
						</select>
						<input type="submit" value="DELETE"/>
					</label>
				</Form>
	
			}
	</Main>
}
