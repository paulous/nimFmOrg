import {lazy, Suspense} from 'react'
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../routes/error"

import RootLayout, {loader as rootLoader} from '../components/RootLayout'
import HomePage, {loader as homeLoader} from '../pages/HomePage'

import ShowsPage, {loader as showsLoader} from '../pages/ShowsPage'
import {loader as programLoader} from '../pages/home/Program'
import {loader as adminProgramLoader} from '../pages/home/AdminProgram'
import {loader as adminShowLoader, actions as adminShowAction} from '../pages/shows/AdminShow'
import {actions as adminAddShowAction} from '../pages/home/AdminAddShow'
import {actions as adminRemoveShowAction} from '../pages/home/AdminRemoveShow'

import ShopPage, {loader as shopLoader} from '../pages/ShopPage'
import ItemDetail from '../pages/shop/ItemDetail'
import {loader as adminShopUpdateLoader, actions as adminUpdateShopAction} from '../pages/shop/AdminShop'
import {actions as adminAddShopAction} from '../pages/shop/AdminAddItem'
import {actions as adminRemoveShopAction} from '../pages/shop/AdminRemoveItem'

import DocsPage, {loader as docsLoader} from '../pages/DocsPage'
import {actions as loginAction} from '../pages/LogInPage'

const LogInPage = lazy(() => import('../pages/LogInPage'))

const Program = lazy(() => import('../pages/home/Program'))
const AdminProgram = lazy(() => import('../pages/home/AdminProgram'))
const AdminShow = lazy(() => import('../pages/shows/AdminShow'))
const AdminAddShow = lazy(() => import('../pages/home/AdminAddShow'))
const AdminRemoveShow = lazy(() => import('../pages/home/AdminRemoveShow'))

const AdminShop = lazy(() => import('../pages/shop/AdminShop'))
const AdminAddShop = lazy(() => import('../pages/shop/AdminAddItem'))
const AdminRemoveShop = lazy(() => import('../pages/shop/AdminRemoveItem'))
//const adminShowLoader = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.loader})))
//const adminShowAction = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.actions})))

export const router = createBrowserRouter([// change home to routes
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
						path: "program",
						element: <Suspense fallback={<>loading...</>}>
									<Program />
					  			</Suspense>,
						loader:programLoader,						
						children:[
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
							},
							{
								path: "admin-program",
								element: <Suspense fallback={<>loading...</>}>
											<AdminProgram />
										  </Suspense>,
								loader:adminProgramLoader,
								children:[
									{ 						
										path: "add-show",
										element: <Suspense fallback={<>loading...</>}>
													<AdminAddShow />
												</Suspense>,
										action:adminAddShowAction
									},
									{ 						
										path: "remove-show",
										element: <Suspense fallback={<>loading...</>}>
													<AdminRemoveShow />
												</Suspense>,
										action:adminRemoveShowAction
									}
								]
							},
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
						path: ":item",
						element: <ItemDetail />,
						children:[
							{ 
								path: "admin-update-item",
								element: <Suspense fallback={<>loading...</>}>
											<AdminShop />
										  </Suspense>,
								loader:adminShopUpdateLoader,
								action:adminUpdateShopAction

							}
						]
					},
					{ 						
						path: "admin-add-item",
						element: <Suspense fallback={<>loading...</>}>
									<AdminAddShop />
								</Suspense>,
						action:adminAddShopAction
					},
					{ 						
						path: "admin-remove-item",
						element: <Suspense fallback={<>loading...</>}>
									<AdminRemoveShop />
								</Suspense>,
						action:adminRemoveShopAction
					}
				]
			}
		]
	}
])