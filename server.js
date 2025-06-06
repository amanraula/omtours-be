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



app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
//app.set("trust proxy", true); // for secure cookies in production
app.use(cors({
   origin: "https://omtours-theta.vercel.app",
//    origin: "http://localhost:5173", // ✅ Correct syntax
    credentials: true,
    // exposedHeaders: ["set-cookie"] // ✅ Correct syntax
}));// allow cross-origin requests and expose cookies
// app.use("/", (req, res) => {
//   res.send("Hello from server");
// }
// );
app.use("/api/v1/auth", authRoutes);
app.use("/plan", planroute);
app.use("/gemini", gemRoutes);
app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
console.log("server started at port", PORT);