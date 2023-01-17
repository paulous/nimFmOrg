import {useContext, useEffect} from 'react'
import {useNavigate, Form, useActionData} from "react-router-dom"
import * as Realm from "realm-web"
import {AdminContext} from "../utils/AdminState"
import {adminLogIn} from "../utils/Realm"
import styled from 'styled-components'
//import media from '../media'

const {
	BSON: { ObjectId },
  } = Realm

const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID})

const Main = styled.div`
    position:relative;
    display:flex;
    align-items:center;
	justify-content:center;
	width:100%;
	height:100vh;
	background-image: radial-gradient(circle at center center, rgb(93, 60, 152),rgb(10, 3, 9));

	h1{
		
	}

	.log-in{
		display:flex;
		align-items:center;
		justify-content:center;
		width:clamp(200px, 90vw, 800px);
		height:clamp(200px, 90vw, 800px);
		border-radius:50% 50%;
		box-shadow:2 2 8 rgba(0,0,0,0.5);
		background:rgba(40, 11, 59, 0.471);
		padding:50px;

			.wrapper{
				display:flex;
				flex-flow:column;

				form{
					display:flex;
					flex-flow:column;
					margin-top:15px;
				}

				input{
					font-size:1.1rem;
					padding:10px;
					margin:3px;
				}

				p{
					padding-bottom:15px;
				}
			}
	}
`

export async function actions({ params, request }) {

	let formData = await request.formData()

	let details = [formData.get("email"), formData.get("pass")]
	let data = await adminLogIn({email:details[0], pass:details[1]})

	return data
}

export default function LogIn(){

	const navigate = useNavigate()
	let actionData = useActionData()

	const adminContext = useContext(AdminContext)
	const {
		setAdmin
	} = adminContext

	useEffect(() => {
		if(actionData?.user){
			setAdmin({status:true})
			navigate('/')
		}
	}, [actionData?.user])

	return <Main>
		<div className='log-in'>
			<div className='wrapper'>
				<h1>LOGIN</h1>
				 <Form method="post" action={`/hackdb`}>
					<input
					name='email'
					type="email" 
					placeholder="your@email.com" />
					{actionData?.errors.email && <span>{actionData.errors.email}</span>}
					<input
					name='pass'
					type="password"
					placeholder="Password" 
					/>
					{actionData?.errors.password && <span>{actionData.errors.password}</span>}
					<input type="submit" />
				</Form>
				
			</div>
		</div>
	</Main>
}