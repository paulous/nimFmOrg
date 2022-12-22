import {useCallback, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import * as Realm from "realm-web"
import {AdminContext} from "../utils/AdminState"
import { useForm } from "react-hook-form"
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

export default function LogIn(){

	const navigate = useNavigate()

	const adminContext = useContext(AdminContext)
	const {
		setAdmin
	} = adminContext

	const adminLogIn = useCallback( async ( {email, password}) => {

		let credentials = Realm.Credentials.emailPassword( email, password )
		try {
			let user = await app.logIn(credentials)

			console.log(user)

			let db = app.currentUser.mongoClient("mongodb-atlas")
			let mongo = db.db("nim-fm")
			
			/*let hosts = await mongo.collection('hosts').find({})

			let hostIds = hosts.map((h,i) => ({hostId:h._id, title:h.title}))

			let program = await mongo.collection('program').find({})

			let changeProgram = hostIds.map((hid,i) => {
				hid.title .map((t,i) => (t.title === hostIds[]))
				return hostIds[i].title
			}).filter((t,i) => (t.title === h.hosts.title))

			console.log(changeProgram)

			let insertValAt = {
                "$push": {
                    "hosts": {
                       "$each": [{'hostId': hostIds[0].hostId}],
                       "$position": 2
                    }
                 }
            }

			{ "$addToSet" : { "hosts.$.hostId" : {} } }

			let programUpdate = await mongo.collection('program').updateOne({'day':'sunday'}, insertValAt, {'upsert':false} )*/



			setAdmin({status:true, program:false, mongo, ObjectId, user})
			navigate('/')
	
		} catch (err) {
			console.error("Failed to log in", err.message)
		}
	
	}, [setAdmin])

	const { register, handleSubmit, watch, formState: { errors } } = useForm()
  	const onSubmit = data => adminLogIn(data)

	return <Main>
		<div className='log-in'>
			<div className='wrapper'>
				<h1>LOGIN</h1>
				 <form onSubmit={handleSubmit(onSubmit)}>
					<input 
					type="email" 
					placeholder="your@email.com" 
					{...register("email" , { required: true })} 					
					/>
					<p>{errors.email && <>This field is required</>}</p>
					<input 
					type="password"
					placeholder="Password" 
					{...register("password", { required: true, minLength: 4 })} 
					/>
					<p>{errors.password && <>This field is required</>}</p>
					<input type="submit" />
				</form>
				
			</div>
		</div>
	</Main>
}