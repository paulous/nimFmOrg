import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
} = Realm

const app = new Realm.App({ id:import.meta.env.VITE_REALM_APP_ID})
const mongo = app.currentUser.mongoClient("mongodb-atlas").db("nimfm")

export const updateShow = async (params, updatedShow) => {

	const data =  await mongo.collection("program").update({'title':params.shows, updatedShow})
	try {
		if (data.length) console.log(data)
		else  console.log("no updateShow data...dude")
		
	} catch (error) {
		console.log("error updateShow...dude", error)
	}
}

export const getTitleId = async () => {

		const data =  await mongo.collection("hosts").aggregate([
			{
			  $project: {
				title: 1
			  },
			}
		])
		try {
			if (data.length) return data
			else  console.log("no hosts data...dude")
			
		} catch (error) {
			console.log("error hosts...dude", error)
		}
}
