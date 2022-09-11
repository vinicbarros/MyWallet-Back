import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Mongo conectado!");
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("mywallet");

export default db;
