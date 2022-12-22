import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../routes/error"
import RootLayout, {loader as rootLoader} from '../components/RootLayout'
import HomePage, {loader as homeLoader} from '../pages/HomePage'
import ItemDetail from '../pages/shop/ItemDetail'
import ShowsPage, {loader as showsLoader} from '../pages/ShowsPage'
import ShopPage, {loader as shopLoader} from '../pages/ShopPage'
import DocsPage, {loader as docsLoader} from '../pages/DocsPage'
import LogInPage from '../pages/LogInPage'

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader:rootLoader,
		children:[
			{ 
				path: "/",
				element: <HomePage />,
				loader:homeLoader,
				children:[
					{ 
						path: ":shows",
						element: <ShowsPage />,
						loader:showsLoader
					},
			]},
			{ 
				path: "docs",
				element: <DocsPage />,
				loader:docsLoader
			},
			{ 
				path: "shop",
				element: <ShopPage />,
				loader:shopLoader,
				children:[
					{				
						path: ":indx",
						element: <ItemDetail />
					}
				]
			}
		]
	},
	{ 
		path: "hackdb",
		element: <LogInPage />
	}
]);