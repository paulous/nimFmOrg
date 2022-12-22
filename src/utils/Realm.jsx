import * as Realm from "realm-web"

const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID})

export const anonLogIn = async (setRealmAnon) => {

	await app.logIn(Realm.Credentials.anonymous())

	if(app.currentUser){
		setRealmAnon(true)
	}else{console.log('mongo failed to load anon...')}
}
