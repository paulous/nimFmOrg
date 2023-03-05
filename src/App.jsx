import {RouterProvider} from "react-router-dom"
//import {QueryClient, QueryClientProvider} from 'react-query'
import {router} from "./routes/create"
import {AudioProvider} from "./utils/AudioState"
import {HomeProvider} from "./utils/HomeState"
import {AdminProvider} from "./utils/AdminState"
import { GlobalStyles } from "./components/GlobalStyles"


export default function App() {

	//const queryClient = new QueryClient()
	//<QueryClientProvider client={queryClient}>
	//</QueryClientProvider>

	
	return (
		<>
			<GlobalStyles />
			<AdminProvider>
				<AudioProvider>
					<HomeProvider>
						<RouterProvider router={router} />						
					</HomeProvider>
				</AudioProvider>
			</AdminProvider>
		</>
	)
}
