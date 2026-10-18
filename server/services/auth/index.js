import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"])
import { connectDB } from "./config/db.js";
import router from "./routes/auth.routes.js";


dotenv.config();

const port = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', router)
app.use("/api/auth", router)

app.get("/", (req, res) => {
    res.send("Auth service is running");
});

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
    connectDB();
})
