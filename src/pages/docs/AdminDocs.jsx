import {useEffect} from 'react'
import { useOutletContext, Form, useActionData, useNavigate} from 'react-router-dom'
import { updateDocs } from '../../utils/actions'
import AdminLinkBtn from '../../components/buttons/AdminLinkBtn'
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

	let updatedItem = {
		title:formData.get("title"), 
		site:formData.get("site"), 
		thumbnail:formData.get("thumbnail"),
		order:formData.get("order")
	}
	console.log(updatedItem, formData.get("_id"))

	return {updatedItem}

	//let result = await updateDocs(formData.get("_id"), updatedItem)

	//return {result, updatedItem}
}

export default function AdminDocs() {

	let {
		indx,
		setIndx,
		docs,
		admin,
		setAdmin
	} = useOutletContext()

	let {
		title,
		site,
		thumbnail,
		order,
		_id
	} = docs[indx]

	let actionData = useActionData()
	let navigate = useNavigate()

	useEffect(() => {

		if(actionData?.result?.modifiedCount === 1){

			navigate(`/docs`)
		}else{
			console.log('nothing was updated')
		}

	}, [actionData])

	return 	<>
		{
			admin.status && 
			<Main>
				<h2>EDIT: {title}</h2>
				<Form method="post" action={`/docs/admin`}>
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
					<input name='_id' type='hidden' defaultValue={_id} />
					<input type="submit" />
				</Form> 
				<AdminLinkBtn {...{
					admin:admin.docs,
					link:`/docs`, 
					setAdmin, 
					area:'docs'
				}} />
				
			</Main>
		}
	</>
}
