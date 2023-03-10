import { getApp, Credentials, MongoDBRealmError } from "realm-web"

const app = getApp(import.meta.env.VITE_REALM_APP_ID)

export const anonLogIn = async () => {

	await app.logIn(Credentials.anonymous())

	try {
		console.log('anonLogin'); 
	} catch (err) {
		console.log('mongo failed to load anon...', err)
	}
}

export const adminLogIn = async ({email, pass}) => {

	await app.currentUser.logOut()

	let credentials = Realm.Credentials.emailPassword( email, pass )
	try {
		//let db = app.currentUser.mongoClient("mongodb-atlas")
		//let mongo = db.db("nim-fm")
		const errors = {}

		// validate the fields
		if (typeof email !== "string" || !email.includes("@")) {
		  errors.email =
			"That doesn't look like an email address"
		}
	  
		if (typeof pass !== "string" || pass.length < 6) {
		  errors.pass = "Pass must be > 6 characters"
		}
	  
		// return data if we have errors
		if (Object.keys(errors).length) {
		  return errors
		}
	  
		// otherwise create the user and redirect
		let user = await app.logIn(credentials)
		console.log(user)
		//success = true
		return {user, errors}

	} catch (err) {
		console.error("Failed to log in", err.message)
		return err
	}
	
}
	export const logOut = async () => {

		let user = await app.currentUser.logOut()
		try {
			console.error("log out", user)

			let userAnon = await anonLogIn()

			console.error("log in", userAnon)
	
		} catch (err) {
			console.error("Failed to log out", err.message)
		}
		
	}