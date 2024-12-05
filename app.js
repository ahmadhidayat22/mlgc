import LoadModel from './controller/LoadModel.js';
import express from 'express';
import cors from 'cors';
import Predictons from './controller/Predictions.js';
import dotenv from 'dotenv';
dotenv.config();

import {upload, multerHandler} from './middleware/multer.js';
import { getResult } from './controller/StoreResults.js';

const app = express();
const port = process.env.PORT || 3000;

// const model= undefined;
const model= await LoadModel();


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Middleware untuk load model sekali saat server dijalankan

const checkModelLoaded = (req, res, next) => {
    if (!model) {
        console.error('Model is not yet loaded. Please check if the model is loaded correctly.');
        return res.status(503).json({ error: 'Model is not yet loaded. Please try again later.' });
    }
    next();
};

app.use(checkModelLoaded);

app.post('/predict', upload, Predictons(model));
app.get('/predict/histories', getResult);

// app.use(router)
app.use(multerHandler);


app.listen(port, () => {
    console.log(`Server running in ${port}`);
})

