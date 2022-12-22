
import {useContext, useEffect, useState, Suspense} from 'react';
import { Outlet, Link, Await, defer, useLoaderData } from 'react-router-dom';
//import {AppContext} from "../utils/AudioState";

export async function loader() {

	return defer( {data:'docs loaded'} );
}

export default function DocsPage(){

	//const context = useContext(AppContext);
	//const {} = context;

	useEffect(() => {
		//setVerified({...verified, favs:verified.favs.splice(0, 1, 'user.id')})
	}, [])


	const data = useLoaderData();


	return <div>Docs Page
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