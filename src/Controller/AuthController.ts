import { Request, Response } from "express";
import { db, admin } from "../Database/FireBase";

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userData = await admin.auth().createUser({ email, password });
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

const signupdetails = async (req: Request, res: Response) => {
  const { uid, name, email, phone } = req.body;
  try {
    await db.collection("users").doc(uid).set({
      name,
      email,
      phone,
      createdAt: new Date(),
    });
    res.status(200).send({
      message: "User details saved successfully",
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
    const userData = await admin.auth().getUserByEmail(email);
    res.status(200).send({
      message: "User created",
      data: userData,
    });
  } catch (err) {
    res.status(500).send({
      message: (err as Error).message,
    });
  }
};

module.exports = { signup, signupdetails };
