import {lazy, Suspense} from 'react'
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../routes/error"
import RootLayout, {loader as rootLoader} from '../components/RootLayout'
import HomePage, {loader as homeLoader} from '../pages/HomePage'
import ItemDetail from '../pages/shop/ItemDetail'
import {loader as adminProgramLoader} from '../pages/home/AdminProgram'
//import AdminShows, {loader as adminShowsLoader, actions as adminShowsAction} from '../pages/shows/AdminShows'
import ShowsPage, {loader as showsLoader} from '../pages/ShowsPage'
import ShopPage, {loader as shopLoader} from '../pages/ShopPage'
import DocsPage, {loader as docsLoader} from '../pages/DocsPage'
import LogInPage from '../pages/LogInPage'

const AdminProgram = lazy(() => import('../pages/home/AdminProgram'))


const AdminShows = lazy(() => import('../pages/shows/AdminShows'))
const adminShowsLoader = lazy(() => import('../pages/shows/AdminShows').then((func) => ({default: func.loader})))
const adminShowsAction = lazy(() => import('../pages/shows/AdminShows').then((func) => ({default: func.actions})))

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
						path: "admin-program",
						element: <Suspense fallback={<>loading...</>}>
									<AdminProgram />
					  			</Suspense>,
						loader:adminProgramLoader
					},
					{ 						
						path: "show/:show",
						element: <ShowsPage />,
						loader:showsLoader,
						children:[
							{ 
								path: "admin-show",
								element: <Suspense fallback={<>loading...</>}>
											<AdminShows />
							  			</Suspense>,
								loader:adminShowsLoader.loader,
								action:adminShowsAction.actions
							}
						]
					}
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