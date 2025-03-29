import express from "express";
import planroute from "./route/planroute.js";
import { ENV_VARS } from "./config/envVars.js";
import gemRoutes from "./gemini/gemroutes.js"
import weatherRoutes from "./weather/weatherroutes.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body
// app.use(cookieParser());
import cors from "cors";
app.use(cors());
app.use("/plan", planroute);
app.use("/ask",gemRoutes);
app.use("/ask",weatherRoutes);
app.listen(PORT);