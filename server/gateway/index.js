import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { protect } from "./middleware/protect.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

    
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
const upstreamUnavailable = (serviceName) => (error, res) => {
    console.error(`${serviceName} error:`, error.message);
    return res.status(503).json({ message: `${serviceName} is unavailable` });
};

app.use(cors(
    {origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,}
    
));

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001", {
    proxyErrorHandler: upstreamUnavailable("Authentication service"),
}));
app.use("/api/projects", protect, proxyWithHeader(
    process.env.PROJECT_SERVICE_URL || "http://localhost:8002",
    { proxyErrorHandler: upstreamUnavailable("Project service") },
));
app.get("/api/me", protect, getCurrentUser);

app.get("/", (req, res) => {
    res.send("Gateway server is running");
});

app.listen(port, () => {
    console.log(`Gateway server is running on port ${port}`);
})
