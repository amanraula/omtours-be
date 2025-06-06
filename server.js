import express from "express";
import planroute from "./route/planroute.js";
import { ENV_VARS } from "./config/envVars.js";
import gemRoutes from "./gemini/gemroutes.js"
import weatherRoutes from "./weather/weatherroutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./route/auth.route.js";

import { connectDB } from "./config/db.js";
const app = express();
const PORT = ENV_VARS.PORT;



app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ['https://omtours-theta.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
   }));

app.use("/api/v1/auth", authRoutes);
app.use("/plan", planroute);
app.use("/gemini", gemRoutes);
app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
console.log("server started at port", PORT);