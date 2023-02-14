import * as dotenv from 'dotenv'
dotenv.config({ path: "./config.env" });

import express from "express";
import cors from "cors";
import record from "./routes/record.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/", record);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("An unexpected error has occured.")
})

// start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

