import express, { Request, Response, Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});
console.log("Hello World~");

app.listen(8080, (error) => {
  if (error) console.log(error);
  else console.log("Server is running on port 8080");
});
