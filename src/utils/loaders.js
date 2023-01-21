import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
} = Realm

const app = new Realm.App({ id:import.meta.env.VITE_REALM_APP_ID})
const mongo = app.currentUser.mongoClient("mongodb-atlas").db("nimfm")


export const getShowTitleId = async () => {

	const data =  await mongo.collection("hosts").aggregate([
		{
		  $project: {
			title: 1,
		  },
		},
	  ])
	try {
		if (data.length) return data.sort((a, b) =>  a.title.localeCompare(b.title))// sort abc...
		else  console.log("no program data...dude")
		
	} catch (error) {
		console.log("error program...dude", error)
	}
}

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
		if (data.length) return data
		else  console.log("no shop data...dude")
		
	} catch (error) {
		console.log("error shop...dude", error)
	}
}


export const getShowsData = async (_id) => {

	const data =  await mongo.collection("hosts").find({'_id':ObjectId(_id)})
	try {
		if (data.length) return data.sort((a,b) => (a.indx - b.indx))
		else  console.log("no shop data...dude")
		
	} catch (error) {
		console.log("error shop...dude", error)
	}
}