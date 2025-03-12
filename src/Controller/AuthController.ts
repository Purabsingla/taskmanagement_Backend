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
