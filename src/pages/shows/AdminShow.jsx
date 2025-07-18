import {useEffect} from 'react'
import { useOutletContext, Form, useParams , useActionData, useNavigate} from 'react-router-dom'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'
import { basicUpdateDB } from "../../utils/actions";


//import media from '../media'
import styled from 'styled-components'

const Main = styled.div`
	position:fixed;
	z-index:1;
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

	const updatedDataId = await basicUpdateDB('shows', params.show, data)

	return {updatedDataId, data}

}

export default function AdminShow() {
	let {
		showsData,
		admin,
		setAdmin
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
	let {show} = useParams()

	useEffect(() => {

		if(actionData?.updatedDataId.documentId === show){

			navigate(`/program/show/${show}`)
		}

	}, [actionData])

  return <Main>
		<h2>EDIT SHOW: {title}</h2>
		<Form method="post" action={`/program/show/${show}/admin-show`}>
			<label> TITLE:
				<input
				name="title"
				type="text"
				defaultValue={title}
				autoFocus
				/>
			</label>
			<label> MASTHEAD IMAGE:
				<input
				name="mastHead"
				type="text"
				defaultValue={mastHead}
				/>
			</label>
			<label> DESCRIPTION:
				<textarea
				name="parOne"
				type="text"
				rows={10}
				defaultValue={parOne}
				/>
			</label>
			<label> PODCAST TITLE:
				<textarea
				name="podcastTitle"
				type="text"
				rows={10}
				defaultValue={podcastTitle && podcastTitle.split(',').join(",\n")}
				/>
			</label>
			<label> PODCAST URLS:
				<textarea
				name="podcastUrl"
				type="text"
				rows={10}
				defaultValue={podcastUrl && podcastUrl.split(',').join(",\n")}
				/>
			</label>
			<label> AUDIO CLIP ONE:
				<input
				name="audOne"
				type="text"
				defaultValue={audOne}
				/>
			</label>
			<label> AUDIO CLIP TWO:
				<input
				name="audTwo"
				type="text"
				defaultValue={audTwo}
				/>
			</label>
			<label> IMAGE ONE:
				<input
				name="imgOne"
				type="text"
				defaultValue={imgOne}
				/>
			</label>
			<label> TEXT BETWEEN IMAGE ONE & TWO:
				<input
				name="parTwo"
				type="text"
				defaultValue={parTwo}
				/>
			</label>
			<label> IMAGE TWO:
				<input
				name="imgTwo"
				type="text"
				defaultValue={imgTwo}
				/>
			</label>
			<label> LINK DESCRIPTION:
				<input
				name="linkDesc"
				type="text"
				defaultValue={linkDesc}
				/>
			</label>
			<label> LINK URL:
				<input
				name="linkUrl"
				type="text"
				defaultValue={linkUrl}
				/>
			</label>
			<label> BACKGROUND IMAGE:
				<input
				name="bgImage"
				type="text"
				defaultValue={bgImage}
				/>
			</label>
			<input type="submit" />
		</Form>
		{
			admin.status && 
			<AdminLinkBtn {...{
				admin:admin.show,
				link:`/program/show/${show}`, 
				setAdmin, 
				area:'show'
			}} />
		}
	</Main>
}
