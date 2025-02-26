import { Request, Response } from "express";
import { db } from "../Database/FireBase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add a user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // ✅ Correct way to get collection in Firebase Admin SDK
    const usersCollection = db.collection("users");
    const docRef = await usersCollection.add({ name, email });

    res.json({ message: "User added", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    // ✅ Correct way to access a collection in Firebase Admin SDK
    const usersCollection = db.collection("users");
    const snapshot = await usersCollection.get();

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const testapi = async (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
};
