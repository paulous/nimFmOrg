import {lazy, Suspense} from 'react'
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../routes/error"

import RootLayout, {loader as programLoader} from '../components/RootLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'

import SponsorsPage, {loader as sponsorsLoader} from '../pages/SponsorsPage'
import {actions as adminSponsorsAction} from '../pages/sponsors/AdminSponsors'
import {actions as adminAddSponsorsAction} from '../pages/sponsors/AdminAdd'
import {actions as adminRemoveSponsorsAction} from '../pages/sponsors/AdminRemove'

//import {loader as programLoader} from '../pages/home/Program'

import ShowsPage from '../pages/ShowsPage'
import Show, {loader as showLoader} from '../pages/shows/Show'
import {loader as adminProgramLoader} from '../pages/home/AdminProgram'
import {actions as adminShowAction} from '../pages/shows/AdminShow'
import {actions as adminAddShowAction} from '../pages/home/AdminAddShow'
import {actions as adminRemoveShowAction} from '../pages/home/AdminRemoveShow'

import ShopPage, {loader as shopLoader} from '../pages/ShopPage'
import ItemDetail from '../pages/shop/ItemDetail'
import {actions as adminUpdateShopAction} from '../pages/shop/AdminShop'
import {actions as adminAddShopAction} from '../pages/shop/AdminAddItem'
import {actions as adminRemoveShopAction} from '../pages/shop/AdminRemoveItem'

import DocsPage, {loader as docsLoader} from '../pages/DocsPage'
import {actions as adminDocsAction} from '../pages/docs/AdminDocs'
import {actions as adminAddDocsAction} from '../pages/docs/AdminAdd'
import {actions as adminRemoveDocsAction} from '../pages/docs/AdminRemove'

const Program = lazy(() => import('../pages/home/Program'))
const AdminProgram = lazy(() => import('../pages/home/AdminProgram'))
const AdminShow = lazy(() => import('../pages/shows/AdminShow'))
const AdminAddShow = lazy(() => import('../pages/home/AdminAddShow'))
const AdminRemoveShow = lazy(() => import('../pages/home/AdminRemoveShow'))

const AdminShop = lazy(() => import('../pages/shop/AdminShop'))
const AdminAddShop = lazy(() => import('../pages/shop/AdminAddItem'))
const AdminRemoveShop = lazy(() => import('../pages/shop/AdminRemoveItem'))


const AdminSponsors = lazy(() => import('../pages/sponsors/AdminSponsors'))
const AdminAddSponsors = lazy(() => import('../pages/sponsors/AdminAdd'))
const AdminRemoveSponsors = lazy(() => import('../pages/sponsors/AdminRemove'))

const AdminDocs = lazy(() => import('../pages/docs/AdminDocs'))
const AdminAddDocs = lazy(() => import('../pages/docs/AdminAdd'))
const AdminRemoveDocs = lazy(() => import('../pages/docs/AdminRemove'))
//const adminShowLoader = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.loader})))
//const adminShowAction = lazy(() => import('../pages/shows/AdminShow').then((func) => ({default: func.actions})))

export const router = createBrowserRouter([// change home to routes
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader:programLoader,
		children:[
			{ 
				path: "/",
				element: <HomePage />,
				children:[
					{ 
						path: "program",
						element: <Suspense fallback={<>loading...</>}>
									<Program />
					  			</Suspense>,
						children:[
							{ 						
								path: "show",
								element: <ShowsPage />,
								children:[
									{
										path: ":show",
										element: <Show />,
										loader:showLoader,
										children:[
											{ 
												path: "admin-show",
												element: <Suspense fallback={<>loading...</>}>
															<AdminShow />
														</Suspense>,
												action:adminShowAction
											}
										]
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
					},
					{ 
						path: "about",
						element: <AboutPage />					
					},
					{ 
						path: "sponsors",
						element: <SponsorsPage />,
						loader:sponsorsLoader,
						children:[
							{
								path: "admin",
								element: <Suspense fallback={<>loading...</>}>
											<AdminSponsors />
										  </Suspense>,
								action:adminSponsorsAction
							},
							{ 						
								path: "add",
								element: <Suspense fallback={<>loading...</>}>
											<AdminAddSponsors />
										</Suspense>,
								action:adminAddSponsorsAction
							},
							{ 						
								path: "remove",
								element: <Suspense fallback={<>loading...</>}>
											<AdminRemoveSponsors />
										</Suspense>,
								action:adminRemoveSponsorsAction
							}
						]
					},
					{ 
						path: "contact",
						element: <ContactPage />					
					},
			]},
			{ 
				path: "docs",
				element: <DocsPage />,
				loader:docsLoader,
				children:[
					{
						path: "admin",
						element: <Suspense fallback={<>loading...</>}>
									<AdminDocs />
								  </Suspense>,
						action:adminDocsAction
					},
					{ 						
						path: "add",
						element: <Suspense fallback={<>loading...</>}>
									<AdminAddDocs />
								</Suspense>,
						action:adminAddDocsAction
					},
					{ 						
						path: "remove",
						element: <Suspense fallback={<>loading...</>}>
									<AdminRemoveDocs />
								</Suspense>,
						action:adminRemoveDocsAction
					}
				]
			},
			{ 
				path: "shop",
				element: <ShopPage />,
				loader:shopLoader,
				children:[
					{				
						path: ":shop",
						element: <ItemDetail />,
						children:[
							{ 
								path: "admin-update-item",
								element: <Suspense fallback={<>loading...</>}>
											<AdminShop />
										  </Suspense>,
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