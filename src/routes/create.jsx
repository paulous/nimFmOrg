import {lazy, Suspense} from 'react'
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../routes/error"
import RootLayout, {loader as rootLoader} from '../components/RootLayout'
import HomePage, {loader as homeLoader} from '../pages/HomePage'
import ItemDetail from '../pages/shop/ItemDetail'
import {loader as adminProgramLoader} from '../pages/home/AdminProgram'
import {loader as adminShowLoader, actions as adminShowAction} from '../pages/shows/AdminShow'
import {actions as adminAddShowAction} from '../pages/home/AdminAddShow'
import {actions as adminRemoveShowAction} from '../pages/home/AdminRemoveShow'
import ShowsPage, {loader as showsLoader} from '../pages/ShowsPage'
import ShopPage, {loader as shopLoader} from '../pages/ShopPage'
import DocsPage, {loader as docsLoader} from '../pages/DocsPage'
import {actions as loginAction} from '../pages/LogInPage'

const LogInPage = lazy(() => import('../pages/LogInPage'))
const AdminProgram = lazy(() => import('../pages/home/AdminProgram'))
const AdminShow = lazy(() => import('../pages/shows/AdminShow'))
const AdminAddShow = lazy(() => import('../pages/home/AdminAddShow'))
const AdminRemoveShow = lazy(() => import('../pages/home/AdminRemoveShow'))
//const adminShowLoader = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.loader})))
//const adminShowAction = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.actions})))

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
						path: "hackdb",
						element: <Suspense fallback={<>loading...</>}>
									<LogInPage />
								</Suspense>,
						action:loginAction
					},
					{ 
						path: "admin-program",
						element: <Suspense fallback={<>loading...</>}>
									<AdminProgram />
					  			</Suspense>,
						loader:adminProgramLoader,
						children:[
							{ 						
								path: "admin-add-show",
								element: <Suspense fallback={<>loading...</>}>
											<AdminAddShow />
										</Suspense>,
								action:adminAddShowAction
							},
							{ 						
								path: "admin-remove-show",
								element: <Suspense fallback={<>loading...</>}>
											<AdminRemoveShow />
										</Suspense>,
								action:adminRemoveShowAction
							}
						]
					},
					{ 						
						path: "show/:show",
						element: <ShowsPage />,
						loader:showsLoader,
						children:[
							{ 
								path: "admin-show",
								element: <Suspense fallback={<>loading...</>}>
											<AdminShow />
							  			</Suspense>,
								loader:adminShowLoader,
								action:adminShowAction
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
	}
])