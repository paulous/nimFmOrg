import {useContext, useEffect, useState, Suspense} from 'react'
import {Main} from './showsStyles'
import { useLoaderData, Outlet } from 'react-router-dom'
import {getShowsData} from '../utils/loaders'
import AdminLinkBtn from '../components/buttons/AdminLinkBtn'
import {AdminContext} from "../utils/AdminState"
import { GlobalStyles } from '../components/GlobalStyles'

export async function loader({ params }) {

	return {showsData: await getShowsData(params.show), params};
}

export default function ShowsPage(){

	const {
		admin, 
		setAdmin
	} = useContext(AdminContext)

	const {showsData, params} = useLoaderData()
	let {
		bgImage, 
		mastHead, 
		podcastTitle, 
		podcastUrl, 
		title, 
		parOne, 
		parTwo, 
		audOne, 
		audTwo, 
		imgOne, 
		imgTwo, 
		linkDesc, 
		linkUrl 
	} = showsData[0]

	return <Main masthead={mastHead} bgImage={bgImage}>
		<GlobalStyles bodyScrollOff={true} />
		<div className='wrap'>
			<div className='head-wrap'>
				<h1>{title.toUpperCase()}</h1>
				{mastHead && <div className='mast-head'></div>}
				<h2>{parOne}</h2>
			</div>
			<div className='podcast-wrap'>
				<h2>{podcastTitle}</h2>
				<p>{podcastUrl}</p>
			</div>
			<div className='audio-wrap'>
				<div>{audOne}</div>
				<div>{audTwo}</div>
			</div>
			<div className='img-txt-wrap'>
				{imgOne && <img src={imgOne} />}
				{parTwo && <h2>{parTwo}</h2>}
				{imgTwo && <img src={imgTwo} />}
			</div>
			<div className='links-wrap'>
				<div>{linkDesc}</div>
				<div>{linkUrl}</div>
			</div>
		</div>
		{
			admin.status && <>
			<Outlet context={showsData[0]} />
			<AdminLinkBtn {...{
				admin:admin.show,
				adminOn:`/show/${params.show}`, 
				adminOff:'admin-show',
				setAdmin, 
				area:'show'
			}} /></>
		}	
	</Main>
}