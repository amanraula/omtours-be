import express from "express";
 
const router=express.Router();
import {gem} from "./gemcontroller.js";

//all routes
router.post("/gemini",gem)


export default router;