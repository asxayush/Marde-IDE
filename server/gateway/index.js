import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import proxy from "express-http-proxy";


dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors(
    {origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,}
    
));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001"));


app.get("/", (req, res) => {
    res.send("Gateway server is running");
});

app.listen(port, () => {
    console.log(`Gateway server is running on port ${port}`);
})
