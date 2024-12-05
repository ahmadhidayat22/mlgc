import tf from '@tensorflow/tfjs-node';

const LoadModel = () => {
    try {
        const model = tf.loadGraphModel(process.env.MODEL_URL);
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.log('Model loaded unsuccessfully');
        return;
    }
    

}

export default LoadModel;
