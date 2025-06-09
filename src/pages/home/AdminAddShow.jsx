import {useEffect} from 'react'
import { useOutletContext, Form , useActionData, useNavigate} from 'react-router-dom'
//import media from '../media'
import styled from 'styled-components'
import BackButton from '../../components/buttons/BackButton'
import { basicAddDB } from "../../utils/actions";

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
		//margin:30px 30px 0;
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
	
	let formData = await request.formData()

	let data = {
		bgImage:formData.get("bgImage"), 
		mastHead:formData.get("mastHead"), 
		podcastTitle:formData.get("podcastTitle"), 
		podcastUrl:formData.get("podcastUrl"), 
		title:formData.get("title"), 
		parOne:formData.get("parOne"), 
		parTwo:formData.get("parTwo"), 
		audOne:formData.get("audOne"), 
		audTwo:formData.get("audTwo"), 
		imgOne:formData.get("imgOne"), 
		imgTwo:formData.get("imgTwo"), 
		linkDesc:formData.get("linkDesc"), 
		linkUrl:formData.get("linkUrl") 
	} 

	let addedId = await basicAddDB('shows', data)
	
	return {addedId, data}

}

export default function AdminAddShow() {
	let {
		showsData,
		admin
	} = useOutletContext()

	let {		
		bgImage, 
		mastHead, 
		podcastTitle, 
		podcastUrl, 
		title, 
		parOne, 
		parTwo, 
		audOne, 
		audTwo, 
		imgOne, 
		imgTwo, 
		linkDesc, 
		linkUrl
	} = showsData

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.addedId){

			navigate(`/program/admin-program`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

  return <>
  		{
			admin.status &&
			<Main>
				<h2>CREATE A NEW SHOW</h2>
				<Form method="post" action={`/program/admin-program/add-show`}>
					<label> TITLE:
						<input
						name="title"
						type="text"
						placeholder={title}
						autoFocus
						/>
					</label>
					<label> MASTHEAD IMAGE:
						<input
						name="mastHead"
						type="text"
						placeholder={mastHead}
						/>
					</label>
					<label> DESCRIPTION:
						<textarea
						name="parOne"
						type="text"
						rows={10}
						placeholder={parOne}
						/>
					</label>
					<label> PODCAST TITLE:
						<input
						name="podcastTitle"
						type="text"
						placeholder={podcastTitle}
						/>
					</label>
					<label> PODCAST URLS:
						<input
						name="podcastUrl"
						type="text"
						placeholder={podcastUrl}
						/>
					</label>
					<label> AUDIO CLIP ONE:
						<input
						name="audOne"
						type="text"
						placeholder={audOne}
						/>
					</label>
					<label> AUDIO CLIP TWO:
						<input
						name="audTwo"
						type="text"
						placeholder={audTwo}
						/>
					</label>
					<label> IMAGE ONE:
						<input
						name="imgOne"
						type="text"
						placeholder={imgOne}
						/>
					</label>
					<label> TEXT BETWEEN IMAGE ONE & TWO:
						<input
						name="parTwo"
						type="text"
						placeholder={parTwo}
						/>
					</label>
					<label> IMAGE TWO:
						<input
						name="imgTwo"
						type="text"
						placeholder={imgTwo}
						/>
					</label>
					<label> LINK DESCRIPTION:
						<input
						name="linkDesc"
						type="text"
						placeholder={linkDesc}
						/>
					</label>
					<label> LINK URL:
						<input
						name="linkUrl"
						type="text"
						placeholder={linkUrl}
						/>
					</label>
					<label> BACKGROUND IMAGE:
						<input
						name="bgImage"
						type="text"
						placeholder={bgImage}
						/>
					</label>
					<input type="submit" value='CREATE SHOW' />
				</Form>
				<BackButton to={'/program/admin-program'} />
			</Main>		
		}
	</>
}
