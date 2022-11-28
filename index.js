// const express = require("express");  // Old type "type" : "common.js"
import express from "express"  // latest method of import and export "type":"module"
import { MongoClient } from "mongodb";
const app = express();
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const PORT = process.env.PORT;
// const zenclass = [
//     {
//       "id": 1,
//       "name": "Syed Abdul Rahman",
//       "Batch": "b39wd",
//       "month": "october",
//       "Task": "Not Submitted",
//       "Attendance": "Present",
//       "Codekata": 40,
//       "tasks": "react route,react context, react Crud",
//       "topics": "Response Cycle, Array, Objects",
//       "date": {
//         "$date": {
//           "$numberLong": "1665792000000"
//         }
//       },
//       "mentors": {
//         "name": "Ragav Kumar",
//         "count": 18
//       },
//       "companydrive": {
//         "ZEN CLASS": "Meet, Connect and Hire our trained freshers. They are hand picked with multiple levels of pre-assessment and trained for 3 months in Fullstack development by technologists from product companies",
//         "Campus Hire": "We pre assess the coding skills matching your requirement. Get access to hire the cream freshers across colleges",
//         "Assessment Platform": "Robust e-recruitment platform for evaluating the coding skill and to capture the behavioral pattern of the candidates. If you want to a hire a right candidate who has hands-on expertise and would expertise and would like to know more about his way of approaching problem.",
//         "date": {
//           "$date": {
//             "$numberLong": "1665792000000"
//           }
//         }
//       },
//       "placement": {
//         "student1": "Syed",
//         "student2": "Ashok",
//         "student3": "Prasanna",
//         "student4": "Sathish"
//       }
//     },
//     {
//       "id": 2,
//       "name": "Ashok",
//       "Batch": "b39wd",
//       "month": "october",
//       "Task": "Not Submitted",
//       "Attendance": "Present",
//       "Codekata": 48,
//       "tasks": "react route,react context, react Crud",
//       "topics": "Response Cycle, Array, Objects",
//       "date": {
//         "$date": {
//           "$numberLong": "1666915200000"
//         }
//       },
//       "mentors": {
//         "name": "Nagaraj",
//         "count": 20
//       },
//       "companydrive": {
//         "ZEN CLASS": "Meet, Connect and Hire our trained freshers. They are hand picked with multiple levels of pre-assessment and trained for 3 months in Fullstack development by technologists from product companies",
//         "Campus Hire": "We pre assess the coding skills matching your requirement. Get access to hire the cream freshers across colleges",
//         "Assessment Platform": "Robust e-recruitment platform for evaluating the coding skill and to capture the behavioral pattern of the candidates. If you want to a hire a right candidate who has hands-on expertise and would expertise and would like to know more about his way of approaching problem.",
//         "date": {
//           "$date": {
//             "$numberLong": "1666915200000"
//           }
//         }
//       },
//       "placement": {
//         "student1": "Syed",
//         "student2": "Ashok",
//         "student3": "Prasanna",
//         "student4": "Sathish"
//       }
//     }
// ]


const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // phone dial// top-level await
await client.connect(); // call button
console.log("Mongo is connected ✌️😊");

app.use(express.json())
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/zenclass", async function(request,response){
  const zenclass = await client.db("zendata").collection("zen").find({}).toArray()
response.send(zenclass) 
})

app.get("/zenclass/:id", async function(request,response){
  const { id } = request.params;
  console.log(id)
  const zen1 = await client.db("zendata").collection("zen").findOne({ id: id });
  // const zen1 = zenclass.find((dt) => dt.id == id) // this one for local data
  console.log(zen1)
  zen1 ? response.send(zen1) : response.status(404).send({msg:"Data not Found"})
})

app.post("/zenclass", async function(request,response){
  const data = request.body
  console.log(data);
  const result = await client.db("zendata").collection("zen").insertMany(data)
  response.send(result)
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
