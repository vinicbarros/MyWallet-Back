import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import Joi from "joi";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

const connection = async () => {
  try {
    await client.connect();
    db = client.db("mywallet");
  } catch (error) {
    console.log(error);
  }
};

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadySignUp = await db.collection("users").findOne({ email });
  const passwordHash = bcrypt.hashSync(password, 12);

  const validate = userSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  } else if (emailAlreadySignUp) {
    return res
      .status(409)
      .send({ message: "The email is already been in use!" });
  }

  try {
    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
      balance: 0,
    });
    res.status(201).send({ message: "account created" });
  } catch (error) {
    res.status(400).send(error);
  }
});
