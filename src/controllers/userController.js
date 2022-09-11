import db from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { stripHtml } from "string-strip-html";

const userSignUp = async (req, res) => {
  let { name, email, password } = res.locals.user;

  name = stripHtml(name).result.trim();
  email = stripHtml(email).result.trim();
  password = stripHtml(password).result.trim();

  const emailAlreadySignUp = await db.collection("users").findOne({ email });
  const passwordHash = bcrypt.hashSync(password, 12);

  if (emailAlreadySignUp) {
    return res
      .status(409)
      .send({ message: "The email is already been in use!" });
  }

  try {
    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
    });
    res.status(201).send({ message: "account created" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = res.locals.user;
  try {
    const user = await db.collection("users").findOne({ email });
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!user || !isValidPass) {
      return res.status(404).send({ message: "Invalid email or password" });
    }
    const token = uuid();
    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });
    return res
      .status(202)
      .send({ name: user.name, balance: user.balance, token });
  } catch (error) {
    return res.status(500).send({ message: "Invalid email or password!" });
  }
};

export { userSignUp, userSignIn };
