import { Firestore } from "@google-cloud/firestore";


const db = new Firestore();

const store_data= async(id, data) => {

    const dataset = {
        id: id,
        history: data.data
    }
// console.log(dataset);

    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(dataset); 
}

const getResult = async(req,res) => {
    const predictCollection = db.collection('prediction');
    const snapshot = await predictCollection.get();
    const data = snapshot.docs.map(doc => doc.data());

    const results = {
        status: "success",
        data: data
    }
    // console.log(results);
    // console.log(snapshot);
    
    res.status(200).json(results);

}

export { store_data, getResult };