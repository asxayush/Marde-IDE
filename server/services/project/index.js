import express from "express";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"])
import { connectDB } from "./config/db.js";
import router from "./routes/project.routes.js";


dotenv.config();

const port = process.env.PORT || 8002;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Project service is running");
});

app.use("/", router)

app.listen(port, () => {
    console.log(`Project service is running on port ${port}`);
    connectDB();
})
