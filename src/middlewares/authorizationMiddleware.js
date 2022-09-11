import db from "../database/database.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send({ message: "invalid token authorization" });
    }

    const user = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (!user) {
      return res.status(401).send({ message: "Invalid user" });
    }
    delete user.password;
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export default auth;
