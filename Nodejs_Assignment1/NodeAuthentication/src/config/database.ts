const {createPool} =require("mysql");
import config from "./config"
const pool =  createPool({
    port: parseInt(config.DB_PORT || '3306', 10),
    host:config.DB_HOST,
    user:config.DB_USER,
    password:config.DB_PASS,
    database:config.MYSQL_DB,
    connectionLimit:10
})

module.exports =pool;