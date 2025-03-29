import express from "express";
 
const router=express.Router();
import {currentwet,futurewet} from "./weathercontroller.js";
//all routes
router.post("/currentwet",currentwet)
router.post("/futurewet",futurewet)
export default router;