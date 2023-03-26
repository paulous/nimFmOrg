import {useState, useEffect} from 'react'
import {RouterProvider} from "react-router-dom"
//import {QueryClient, QueryClientProvider} from 'react-query'
import {router} from "./routes/create"
import {AudioProvider} from "./utils/AudioState"
import {HomeProvider} from "./utils/HomeState"
import {AdminProvider} from "./utils/AdminState"
import {anonLogIn} from './utils/Realm'
import { GlobalStyles } from "./components/GlobalStyles"
import { ShowTimeProvider } from "./utils/ShowTimeState";
import { getProgramData } from "./utils/loaders";
import { worldTime } from "./utils/worldTime";


export default function App() {

	//const queryClient = new QueryClient()
	//<QueryClientProvider client={queryClient}>
	//</QueryClientProvider>

	const [initData, setInitData] = useState({})

	useEffect(() => {
		console.log('re logging in', initData)

		let anon = async () => {
			let [ user, program, wt ] = await Promise.all([
				anonLogIn(), 
				getProgramData(),
				worldTime() 
			])

			setInitData({ user, program, wt })

		}
		anon()

	}, [])

	let { user, program, wt } = initData
	
	return <>
			<GlobalStyles />
				{
					user 
					? <AdminProvider {...{user}}>
						<AudioProvider>
							<HomeProvider>
								<ShowTimeProvider {...{ wt, program }}>
										<RouterProvider router={router} />																		
								</ShowTimeProvider>
							</HomeProvider>
						</AudioProvider>
					</AdminProvider>
					: <div>Loading...</div>
				}
		</>
	
}
