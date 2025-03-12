import { Request, Response } from "express";
import { db, admin } from "../Database/FireBase";
import bycrypt from "bcryptjs";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const HashedPassword = await bycrypt.hash(password, 10);
    const userData = await admin.auth().createUser({ email });
    await db.collection("users").doc(userData.uid).set({
      email,
      password: HashedPassword,
    });

    res.status(200).send({
      message: "User created successfully",
      uid: userData.uid,
    });
  } catch (err) {
    res.status(500).send({
      message: (err as Error).message,
    });
  }
};

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userData = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (userData.empty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = userData.docs[0].data();
    const userId = userData.docs[0].id;

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate Firebase custom token (Optional)
    const customToken = await admin.auth().createCustomToken(userId);

    res
      .status(200)
      .json({ uid: userId, token: customToken, message: "Login successful" });
  } catch (err) {
    res.status(500).send({
      message: (err as Error).message,
    });
  }
};

const signupdetails = async (req: Request, res: Response) => {
  const { uid, name, phone } = req.body;
  try {
    await db.collection("users").doc(uid).set(
      {
        name,
        phone,
        createdAt: new Date(),
      },
      { merge: true }
    );
    res.status(200).send({
      message: "User details saved successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: (err as Error).message,
    });
  }
};

module.exports = { signup, signupdetails };
