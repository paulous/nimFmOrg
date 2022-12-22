
import {useContext, useEffect, useState, Suspense} from 'react';
import { Outlet, Link, Await, defer, useLoaderData } from 'react-router-dom';
//import {} from "../utils/AudioState";

export async function loader() {

	return defer( {data:'gallery loaded'} );
}

export default function GalleryPage(){

	//const context = useContext(AppContext);
	//const {} = context;

	useEffect(() => {
		//setVerified({...verified, favs:verified.favs.splice(0, 1, 'user.id')})
	}, [])


	const data = useLoaderData();


	return <div>Gallery Page
		<Suspense fallback={<p>Loading...</p>} >
			<Await
			resolve={data.data}
			errorElement={<p>Error loading...</p>}
			>
				{(data) => <ul>{data}</ul>}
			</Await>
		</Suspense>
	</div>
}