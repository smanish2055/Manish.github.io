import dotenv from "dotenv";
dotenv.config();

const config = {
    serverPort: process.env.PORT || 8001,
}



export default config;