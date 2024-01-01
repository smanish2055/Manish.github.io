import dotenv from "dotenv";
dotenv.config();

const config = {
    serverPort: process.env.PORT || 3000,
    DB_PORT: process.env. DB_PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    MYSQL_DB: process.env.MYSQL_DB,

}



export default config;