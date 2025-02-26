import express from "express";
import { addUser, getUsers, testapi } from "../Controller/userController";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getUsers);
router.get("/hello", testapi);
export default router;
