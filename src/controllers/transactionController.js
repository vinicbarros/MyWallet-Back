import db from "../database/database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

const postTransactions = async (req, res) => {
  const user = res.locals.user;
  const { type, amount, description } = res.locals.transaction;

  try {
    await db.collection("transactions").insertOne({
      type: type,
      description: description,
      amount: amount,
      userId: user._id,
      date: dayjs().format("DD/MM"),
    });
    res.status(201).send({ message: "Successfully transaction" });
  } catch (error) {
    res.status(401).send({ message: error });
  }
};

const getTransactions = async (req, res) => {
  const user = res.locals.user;

  try {
    const filteredTransactions = await db
      .collection("transactions")
      .find({ userId: user._id })
      .sort({ _id: -1 })
      .toArray();
    res.status(200).send(filteredTransactions);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteTransaction = async (req, res) => {
  const id = res.locals.id;

  try {
    const deleted = await db
      .collection("transactions")
      .deleteOne({ _id: ObjectId(id) });
    res.status(200).send({ message: "Transaction delected successfully" });
  } catch (error) {
    res.status(404).send({ message: "An error ocurred" });
  }
};

export { postTransactions, getTransactions, deleteTransaction };
