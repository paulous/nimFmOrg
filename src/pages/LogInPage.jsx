import {useContext, useEffect} from 'react'
import {useNavigate, Form, useActionData} from "react-router-dom"
import * as Realm from "realm-web"
import {AdminContext} from "../utils/AdminState"
import {adminLogIn} from "../utils/Realm"
import styled from 'styled-components'
//import media from '../media'

const Main = styled.div`
    position:fixed;
	top:44px;
	bottom:0;
	left:0;
	right:0;
	display:flex;
	justify-content:center;
	background-image: radial-gradient(circle at top right,rgb(184 220 220 / 50%) 0%,rgba(64,9,119,0.6) 48%,rgba(72,7,149,0.2) 48%,rgba(72,7,149,0.2) 53%,rgba(109,5,178,0.3) 53%,rgba(109,5,178,0.3) 56%,rgba(145,2,208,0.3) 56%,rgba(145,2,208,0.3) 69%,rgb(85 0 237 / 33%) 69%,rgb(237 193 0 / 31%) 100%), linear-gradient(0deg,rgba(119,8,119,0.504) 15%,rgb(3 53 36 / 51%) 95%);
	${props => props.bgImage && `, url(${props.bgImage}); background-size:cover;`};
	overflow-y:auto;

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
			setAdmin({status:true, user:actionData.user})
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