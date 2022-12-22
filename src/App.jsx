import {useState, useEffect} from 'react'
import {RouterProvider} from "react-router-dom"
import {router} from "./routes/create"
import {AudioProvider} from "./utils/AudioState"
import {HomeProvider} from "./utils/HomeState"
import {AdminProvider} from "./utils/AdminState"
import {anonLogIn} from './utils/Realm'
import { GlobalStyles } from "./components/GlobalStyles"


export default function App() {

	const [realmAnon, setRealmAnon] = useState({})
	useEffect(() => {anonLogIn(setRealmAnon)}, [])
	
	return (
		<>
			<GlobalStyles />
			<AdminProvider>
				<AudioProvider>
					<HomeProvider>
						{
							realmAnon 
							? 	<RouterProvider router={router} />
							: 	<div>Loading...</div>
						}
					</HomeProvider>
				</AudioProvider>
			</AdminProvider>
		</>
	)
}
