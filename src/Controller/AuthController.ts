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
