import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
  Credentials
} = Realm

const app = new Realm.App({ id:import.meta.env.VITE_REALM_APP_ID})

export const anonLogIn = async () => {

	try {
		await app.logIn(Credentials.anonymous())
		console.log('mongo anon...')
		return app.currentUser

	} catch (err) {
		console.log('mongo failed to load anon...', err)
	}

}

export const adminLogIn = async ({email, pass}) => {

	try {
		await app.currentUser.logOut()

		let credentials = Credentials.emailPassword( email, pass )
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
		console.log(user.id)
		//success = true
		return {user, errors}

	} catch (err) {
		console.error("Failed to log in", err.message)
		return err
	}
	
}
	export const logOut = async () => {

		try {
			let user = await app.currentUser.logOut()
			console.error("log out", user)

			//let userAnon = await anonLogIn()

			console.error("log in", userAnon)
	
		} catch (err) {
			console.error("Failed to log out", err.message)
		}
		
	}