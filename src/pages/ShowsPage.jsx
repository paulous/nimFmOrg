import {useContext} from 'react'
import {Main} from './showsStyles'
import {useLoaderData, Outlet } from 'react-router-dom'
import {getShowsData} from '../utils/loaders'
import AdminLinkBtn from '../components/buttons/AdminLinkBtn'
import {AdminContext} from "../utils/AdminState"
import {ChangeChars} from '../utils/springAnimations'
import BackButton from '../components/buttons/BackButton'

export async function loader({ params }) {

	return {showsData: await getShowsData(params.show), params}
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

	console.log(showsData)

	return <Main masthead={mastHead} bgImage={bgImage}>
		<div className='wrap'>
			<div className='head-wrap'>
				<h1>{<ChangeChars text={title.toUpperCase()} min={0.1} max={1} />} </h1>
				{mastHead && <div className='mast-head'></div>}
			</div>
			<h2>{parOne}</h2>
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
			<AdminLinkBtn {...{
				admin:admin.show,
				link:`/program/show/${params.show}/admin-show`, 
				setAdmin, 
				area:'show'
			}} />
			<Outlet context={{showsData, admin, setAdmin}} />
			</>
		}
		<BackButton to={'/program'} />
	</Main>
}