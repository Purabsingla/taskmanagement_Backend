import { Request, Response } from "express";
import { db } from "../Database/FireBase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add a user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const docRef = await addDoc(collection(db, "users"), { name, email });

    res.json({ message: "User added", id: docRef.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const testapi = async (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
};
