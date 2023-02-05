import * as Realm from "realm-web"
const {
  BSON: { ObjectId },
} = Realm

const app = new Realm.App({ id:import.meta.env.VITE_REALM_APP_ID})
const mongo = app.currentUser.mongoClient("mongodb-atlas").db("nimfm")

export const addShow = async (addShow) => {

	const data =  await mongo.collection("hosts").insertOne({}, addShow, {'upsert':false})
	try {
		return data
		
	} catch (error) {
		console.log("error addShow...dude", error)
	}
}

export const removeShow = async (params) => {

	const data =  await mongo.collection("hosts").deleteOne({'_id':ObjectId(params.show) })
	try {
		return data
		
	} catch (error) {
		console.log("error deleteShow...dude", error)
	}
}

export const updateShow = async (params, updatedShow) => {

	const data =  await mongo.collection("hosts").updateOne({'_id':ObjectId(params.show) }, updatedShow, {'upsert':false})
	try {
		return data
		
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

export const updateProgram = async (data) => {

	let days = Object.keys(data)
	let shows = Object.values(data)

	console.log(data)

	let result = await Promise.all(
		days.map(async (d,i) => {
			return await mongo.collection("program").updateOne(
				{ "day": d }, 
				{ "$set": { "hosts": shows[i] || {} }}, 
				{ "upsert": false } )
		})
	)
	
	return {result, days, shows}
}

export const updateShop = async (params, updatedShop) => {

	const data =  await mongo.collection("shop").updateOne({'_id':ObjectId(params.shop) }, updatedShop, {'upsert':false})
	try {
		return data
		
	} catch (error) {
		console.log("error updateShow...dude", error)
	}
}

export const addShop = async (params, addShop) => {

	const data =  await mongo.collection("shop").insertOne({'_id':ObjectId(params.shop)  }, addShop, {'upsert':false})
	try {
		return data
		
	} catch (error) {
		console.log("error addShop...dude", error)
	}
}

export const removeShop = async (params) => {

	const data =  await mongo.collection("shop").deleteOne({'_id':ObjectId(params.shop)  })
	try {
		return data
		
	} catch (error) {
		console.log("error deleteShop...dude", error)
	}
}
