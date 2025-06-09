import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    writeBatch,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebase"; // Import your Firestore instance

//import { useAuth } from "../contexts/AuthContext"; // Import the custom hook
//const { user, loading } = useAuth();
/////////author_uid: currentUserUid, // <-- This is the crucial part matching your rules

export const basicAddDB = async (coll, data) => {
    try {
        const docRef = await addDoc(collection(db, coll), data);
        //console.log("Document written with ID:", docRef.id);

        return docRef.id;
    } catch (e) {
        //console.error("Error adding document: ", e);
    }
};

export const basicRemoveDB = async (coll, documentId) => {
    const hostDocRef = doc(db, coll, documentId);

    try {
        // This operation will FAIL if the document does NOT exist or if security rules prevent deletion
        await deleteDoc(hostDocRef);

        //console.log(`Document with ID ${documentId} in collection ${coll} successfully deleted.`);

        return documentId;
    } catch (error) {
        //console.error(`Error deleting document with ID ${documentId}:`, error);
        throw error;
    }
};

export const basicUpdateDB = async (coll, documentId, dataToUpdate) => {
    const hostDocRef = doc(db, coll, documentId);

    try {
        // This operation will FAIL if the document does NOT exist (this is the upsert: false behavior)
        await updateDoc(hostDocRef, dataToUpdate);
        //console.log(`Document with ID ${documentId} in collection ${coll} successfully updated.`);
        return { documentId };
    } catch (error) {
        //console.error(`Error updating document with ID ${documentId}:`, error);
        throw error;
    }
};

export const updateByEqualityDB = async (coll, keyValue, dataToUpdate) => {

    const q = query(
        collection(db, coll),
        where(keyValue.key, "==", keyValue.val)
    );

    const querySnapshot = await getDocs(q); // <-- Crucial step: Await the results!

    // Assuming there's only one document with that email
    if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]; // Get the first document snapshot
        const docRef = docSnapshot.ref; // Get the DocumentReference from the snapshot

        try {
            await updateDoc(docRef, dataToUpdate);

            return true
            
        } catch (error) {
            
        }
    }
};

export const getTitleId = async () => {
    try {
        const collectionRef = collection(db, "shows");
        const snapshot = await getDocs(query(collectionRef)); // Use getDocs and await the result

        const docs = [];
        snapshot.forEach((doc) => {
            // doc.data() gives you the document data as a plain object
            // doc.id gives you the document ID (a string)

            const show = {
                ...doc.data(), // Spread the existing document data
                _id: doc.id, // Add the document ID under the '_id' key
            };

            docs.push(show);
        });

        if (docs.length) return docs;
        else return [];
    } catch (e) {
        //console.error("Error getting shows document: ", e);
    }
};

export const updateProgram = async (data, user) => {
    /*let with_uid = {}

    for (const key in data) {
        if (data.hasOwnProperty(key)) {

			with_uid[key] = data[key].map((p) => ({ ...p, author_uid: user.uid }));
        }
    }*/

    let days = Object.keys(data);
    let shows = Object.values(data);

    const programCollectionRef = collection(db, "program");
    const batch = writeBatch(db);
    const queryPromises = [];

    //console.log("Starting batch update process for program hosts...");

    // Step 1: Prepare queries for each day and collect promises
    days.forEach((day, index) => {
        const q = query(programCollectionRef, where("day", "==", day));
        queryPromises.push(getDocs(q));
    });

    try {
        // Step 2: Wait for all queries to complete
        const querySnapshots = await Promise.all(queryPromises);

        let operationsAdded = 0;

        // Step 3: Process query results and add update operations to the batch
        querySnapshots.forEach((querySnapshot, index) => {
            const currentDay = days[index];
            const currentNewHostsData = shows[index]; // Get the hosts data for this specific day

            if (querySnapshot.empty) {
                console.warn(
                    `No document found in 'program' collection with day: ${currentDay}. Skipping update for this day.`
                );
            } else {
                // Document(s) found with this 'day' value, so we'll update
                if (querySnapshot.docs.length > 1) {
                    console.warn(
                        `Found multiple documents for day: ${currentDay}. Updating the first one found.`
                    );
                }
                // Get reference to the first found document
                const docToUpdateRef = querySnapshot.docs[0].ref;

                // Add the update operation to the batch
                batch.update(docToUpdateRef, {
                    hosts: currentNewHostsData, // Replace the existing 'hosts' field
                });
                //console.log(`Added update to batch for document with day: ${currentDay} (Document ID: ${docToUpdateRef.id})`);
                operationsAdded++;
            }
        });

        // Step 4: Commit the batch as a single atomic operation
        if (operationsAdded > 0) {
            await batch.commit();
            //console.log(`Batch update committed successfully. ${operationsAdded} documents updated.`);
            return { operationsAdded, days, shows };
        } else {
            // console.log( "No documents found for the provided days, batch commit skipped.");
        }
    } catch (error) {
        //console.error("Error performing batch update:", error);
        // Rethrow or handle the error
        throw error;
    }
};
