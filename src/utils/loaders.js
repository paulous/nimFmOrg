import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
} = Realm

const app = new Realm.App({ id:import.meta.env.VITE_REALM_APP_ID})
const mongo = app.currentUser.mongoClient("mongodb-atlas").db("nimfm")

export const getProgramData = async () => {

	const data =  await mongo.collection("program").find({})
	try {
		if (data.length) return data.sort((a,b) => (a.indx - b.indx))
		else  console.log("no program data...dude")
		
	} catch (error) {
		console.log("error program...dude", error)
	}
}



export const getShopData = async () => {

	const data =  await mongo.collection("shop").find({})
	try {
		if (data.length) return data.sort((a,b) => (a.indx - b.indx))
		else  console.log("no shop data...dude")
		
	} catch (error) {
		console.log("error shop...dude", error)
	}
}


export const getShowsData = async (title) => {

	const data =  await mongo.collection("hosts").find({'title':title})
	try {
		if (data.length) return data.sort((a,b) => (a.indx - b.indx))
		else  console.log("no shop data...dude")
		
	} catch (error) {
		console.log("error shop...dude", error)
	}
}