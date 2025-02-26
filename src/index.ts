import express, { Application } from "express";
import cors from "cors";
import router from "./Routes/userRouter";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

console.log("Hello World~");

// Corrected app.listen()
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
