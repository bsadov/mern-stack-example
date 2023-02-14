import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
  let collection = await db.collection("records");
  let result = await collection.find({}).toArray();

  res.json(result).status(200);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  let myquery = { _id: new ObjectId( req.params.id )};

  let collection = await db.collection("records");
  let result = await collection.findOne(myquery);

  res.json(result).status(200);
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, res) {
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };

  let collection = await db.collection("records");
  let result = await collection.insertOne(myobj);

  res.json(result).status(200);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, res) {
  let myquery = { _id: new ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(myquery, newvalues);
  console.log("1 document updated");

  res.json(result).status(200);
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async function (req, res) {
  let myquery = { _id: new ObjectId( req.params.id )};

  let collection = await db.collection("records");
  let result = await collection.deleteOne(myquery);
  console.log("1 document deleted");

  res.json(result).status(200);
});

export default recordRoutes;
