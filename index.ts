import 'dotenv/config' 
import express from "express";
import db from "./db/dataSource.js";
import reck from "./router/recognition.js";
import cele from "./router/celebrities.js";
import textImage from "./router/text.js"
import multer from 'multer'

const PORT = 5000; 
const app = express();
app.use('/uploads', reck);
app.use('/celebrities', cele);
app.use('/text', textImage);

app.listen(PORT, () => {
    // logger(`App is listening on port ${PORT}`);

    console.log(`App is listening on port ${PORT}`);
    db.initialize().then(() => {
        console.log("Connected to DB!");
      }).catch(err => {
        console.error('Failed to connect to DB: ' + err);
      });
  });

  export default app;
