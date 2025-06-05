import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
	PORT: process.env.PORT || 8000,
	GEM_API_KEY: process.env.GEM_API_KEY,
	//JWT_SECRET: process.env.JWT_SECRET,
	// NODE_ENV: process.env.NODE_ENV,

};
