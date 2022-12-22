import {useContext, useEffect, useState, Suspense} from 'react'
import {Main} from './showsStyles'
import { useLoaderData } from 'react-router-dom'
import {getShowsData} from '../utils/loaders'
import AdminShows from './shows/AdminShows'
import {AdminContext} from "../utils/AdminState"
import { GlobalStyles } from '../components/GlobalStyles'

export async function loader({ params }) {

	return {showsData: await getShowsData(params.shows)};
}

export default function ShowsPage(){


	const {admin} = useContext(AdminContext)

	const {showsData} = useLoaderData()
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
			{
				admin.program 
				? 	<AdminShows />
				:	<div className='wrap'>
						<div className='head-wrap'>
							<h1>{title.toUpperCase()}</h1>
							<div className='mast-head'></div>
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
							<h2>{parTwo}</h2>
							{imgTwo && <img src={imgTwo} />}
						</div>
						<div className='links-wrap'>
							<div>{linkDesc}</div>
							<div>{linkUrl}</div>
						</div>
					</div>
			}
					
	</Main>
}