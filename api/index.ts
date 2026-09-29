import express from "express";
import cors from "cors";
import router from "../api-server/src/routes/index";
import { connectToDatabase } from "../api-server/src/lib/mongodb";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default async function handler(req: any, res: any) {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error("[Vercel API] MongoDB Atlas connection error:", err);
  }
  return app(req, res);
}
