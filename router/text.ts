import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import fs from "fs";
import { RecognizeCelebritiesCommand } from  "@aws-sdk/client-rekognition";
import { Logs } from "../db/entities/logs.js";
const router = express.Router();
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log(req.file);
    
    
    res.status(500).send("Failed Upload File!");
    return;
  }
  const fileURL = req.file.destination + req.file.filename;

  ///////////
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIA3SQWPZW4TR3QDYWV",
    secretAccessKey: "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",
  });

  
  const rekognition = new AWS.Rekognition();
  const filePath = fileURL;
  const imageBytes = fs.readFileSync(filePath);

  const params = {
    Image: {
      Bytes: imageBytes
    },
    Attributes: ["ALL"],
  };

  rekognition.detectText({ Image: { Bytes: imageBytes } }, function (err, data) {
    if (err) {
      res.status(400).send("Error:");
    } else {
        const logs = new Logs();
        logs.imagePath = filePath;
        logs.result = data;
        logs.typeOfRec = 'text';
        logs
          .save()
          .then(() => {
            return res.status(200).json(data);
          })
          .catch((error:any) => {
            console.error("Error saving log entry:", error);
            return res.status(500).json({ message: "Error saving log entry" });
          });
    }
  });
});

export default router;
