import express from "express";
import { addUser, getUsers, testapi } from "../Controller/userController";
import { Login, signup, signupdetails } from "../Controller/AuthController";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getUsers);
router.get("/hello", testapi);
router.post("/signup", signup);
router.post("/login", Login);
router.post("/signupdetails", signupdetails);
export default router;
