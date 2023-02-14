import * as dotenv from 'dotenv'
dotenv.config({ path: "./config.env" });

import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connection to MongoDB successful");
} catch(error) {
  console.error(error);
}

let db = conn.db("employees");

export default db;