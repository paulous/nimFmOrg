import {useState, useEffect} from 'react'
import {RouterProvider} from "react-router-dom"
import {QueryClient, QueryClientProvider} from 'react-query'
import {router} from "./routes/create"
import {AudioProvider} from "./utils/AudioState"
import {HomeProvider} from "./utils/HomeState"
import {AdminProvider} from "./utils/AdminState"
import {anonLogIn} from './utils/Realm'
import { GlobalStyles } from "./components/GlobalStyles"


export default function App() {

	const queryClient = new QueryClient()

	const [realmAnon, setRealmAnon] = useState({})
	useEffect(() => {anonLogIn(setRealmAnon)}, [])
		
	
	return (
		<>
			<GlobalStyles />
			<AdminProvider>
				<AudioProvider>
					<HomeProvider>
						<QueryClientProvider client={queryClient}>
							{
								realmAnon 
								? 	<RouterProvider router={router} />
								: 	<div>Loading...</div>
							}
						</QueryClientProvider>
					</HomeProvider>
				</AudioProvider>
			</AdminProvider>
		</>
	)
}
