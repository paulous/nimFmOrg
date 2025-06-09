import { db } from "../firebase"; // Import your Firestore instance
import { collection, query, getDocs, getDoc, doc, where } from "firebase/firestore"; // Import Firestore methods

export const getShowTitleId = async () => {

    try {
        const collectionRef = collection(db, "shows");
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result

        const docs = [];
        snapshot.forEach((doc) => {
            // doc.data() gives you the document data as a plain object
            // doc.id gives you the document ID (a string)

            const show = {
                title: doc.data().title, // Spread the existing document data
                _id: doc.id, // Add the document ID under the '_id' key
            };

            docs.push(show);
        });
        
        if (docs.length) return docs.sort((a, b) =>  a.title.localeCompare(b.title))// sort abc;
        //else console.log("no shop data...dude"); return []; 

    } catch (e) {
        console.error("Error getting shows document: ", e);
    }
};

export const getProgramData = async () => {

    try {
        const collectionRef = collection(db, 'program');
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result
        const docs = snapshot.docs.map((p) => p.data());

		if (docs.length) return docs.sort((a, b) => a.indx - b.indx);
    	//else console.log("no program data...dude");
        console.log(docs);

    } catch (e) {console.error("Error getting program document: ", e);}
};

export const getShopData = async () => {

	try {
        const collectionRef = collection(db, 'shop');
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result
        const docs = [];
        snapshot.forEach((doc) => {

            const shop = {
                ...doc.data(), // Spread the existing document data
                _id: doc.id, // Add the document ID under the '_id' key
            };

            docs.push(shop);
        });
       
        return docs;

    } catch (e) {console.error("Error getting program document: ", e);}
};

export const getShowsData = async (id) => {
	try {
        const collectionRef = doc(db, 'shows', id);
        const snapshot = await getDoc(query(collectionRef)); // Use getDocs and await the result
        const showDoc = snapshot.data();

		return showDoc

    } catch (e) {console.error("Error getting shows document: ", e);}

};

export const getSponsors = async () => {

	try {
        const collectionRef = collection(db, 'sponsors');
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result
        
        const docs = [];
        snapshot.forEach((doc) => {

            const shop = {
                ...doc.data(), // Spread the existing document data
                _id: doc.id, // Add the document ID under the '_id' key
            };

            docs.push(shop);
        });
       
        return docs.sort((a, b) => a.order - b.order);

    } catch (e) {console.error("Error getting program document: ", e);}
};

export const getDocuments = async () => {

	try {
        const collectionRef = collection(db, 'docs');
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result

        const docs = [];
        snapshot.forEach((doc) => {

            const shop = {
                ...doc.data(), // Spread the existing document data
                _id: doc.id, // Add the document ID under the '_id' key
            };

            docs.push(shop);
        });
       
        return docs.sort((a, b) => a.order - b.order);

    } catch (e) {console.error("Error getting program document: ", e);}
};

export const getEqualityDoc = async (coll, keyValue) => {

    const q = query(
        collection(db, coll),
        where(keyValue.key, "==", keyValue.val)
    );

    try {
        const querySnapshot = await getDocs(q); // <-- Crucial step: Await the results!

        if (querySnapshot.empty) {
            //console.log(`No document found in collection "${coll}" where ${keyValue.key} == "${keyValue.val}"`);
            return null; // Return null or undefined to indicate no document was found
        } else {
            // Documents were found. We'll return the first one.
            // If you expect 'keyValue.key' to be unique, there should only be one here.
            const docSnapshot = querySnapshot.docs[0];
            //console.log(`Found document with ID: ${docSnapshot.id}`);
            return docSnapshot.data();
        }

    } catch (error) {
        console.error(`Error fetching document from "${coll}" where ${keyValue.key} == "${keyValue.val}":`, error);
        throw error; // Re-throw the error for handling higher up
    }

};
