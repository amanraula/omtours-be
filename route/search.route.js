import express from "express";
import {
	removeItemFromSearchHistory,
	search,

} 
from "../controllers/search.controller.js";

const router = express.Router();

router.get("/:query", search);


router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
