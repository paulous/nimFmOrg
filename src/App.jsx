import { RouterProvider } from "react-router-dom"
import { router } from "./routes/create"
import { AudioProvider } from "./utils/AudioState"
import { HomeProvider } from "./utils/HomeState"
import { AdminProvider } from "./utils/AdminState"
import { GlobalStyles } from "./components/GlobalStyles"
import { ShowTimeProvider } from "./utils/ShowTimeState";
// Firebase
import { AuthProvider } from './contexts/AuthContext'; // Import the provider


export default function App() {

	return <>
		<GlobalStyles />
		<AuthProvider>
			<AdminProvider>
				<AudioProvider>
					<HomeProvider>
						<ShowTimeProvider>
							<RouterProvider router={router} />
						</ShowTimeProvider>
					</HomeProvider>
				</AudioProvider>
			</AdminProvider>
		</AuthProvider>
	</>

}
