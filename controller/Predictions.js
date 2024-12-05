import tf from '@tensorflow/tfjs-node';
import { nanoid } from 'nanoid';
import { store_data } from './StoreResults.js';


const Predictons = ( model ) => async(req, res) => {
    // console.log(model);
    try {

        const image = req.file.buffer;
        const tensor = tf.node
            .decodeImage(image) // Decode gambar dari buffer
            .resizeNearestNeighbor([224, 224]) // Resize ke 224x224
            .expandDims()// Tambahkan dimensi batch (1, 224, 224, 3)
            .toFloat()
        const prediction = await model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
        const thresold = 50;
        let cancer = false;
        if(confidenceScore > thresold) cancer = true;
        const id = nanoid();

        let data = {
            status: "success",
            message: "Model is predicted successfully",
            data: {   
                id: id,
                result: cancer ? "Cancer" : "Non-cancer",
                suggestion: cancer ? "Segera periksa ke dokter!" : "Penyakit kanker tidak terdeteksi.",
                createdAt: new Date().toISOString()
                }
         
        };
        store_data(id,data);
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ 
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi' });
    }   
}

export default Predictons;
