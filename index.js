import express from "express"
import { MongoClient } from "mongodb";
const app = express();
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // phone dial// top-level await
await client.connect(); // call button
console.log("Mongo is connected ✌️😊");

app.use(express.json())
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/zenclass", async function (request, response) {
  const zenclass = await client.db("zendata").collection("zen").find({}).toArray()
  response.send(zenclass)
})

app.get("/zenclass/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id)
  const zen1 = await client.db("zendata").collection("zen").findOne({ id: id });
  console.log(zen1)
  zen1 ? response.send(zen1) : response.status(404).send({ msg: "Data not Found" })
})

app.post("/zenclass", async function (request, response) {
  const data = request.body
  console.log(data);
  const result = await client.db("zendata").collection("zen").insertMany(data)
  response.send(result)
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
