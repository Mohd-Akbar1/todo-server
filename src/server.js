import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

//loading environment variables from .env file

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });


const PORT = process.env.PORT || 8000;

async function startServer() {

    try {
        //connecting mongodb database
        await connectDB();

        // starting server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Error connecting to the server:", error.message);
        process.exit(1);
    }
}

startServer();
