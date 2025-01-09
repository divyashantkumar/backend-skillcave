import { config } from 'dotenv';
config();
import app from './app.js';
import connectToDB from './database/mongoDB.js'

const PORT = process.env.PORT || 3000;


connectToDB().then(() => {
    app.listen(PORT, (error) => {
        if(error) {
            console.log('❌ Server connection error -> ', error);
            return;
        }
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log('❌ MongoDB connection error. Please make sure MongoDB is running. -> ', error);
});
