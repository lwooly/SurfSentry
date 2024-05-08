import pg from "pg";
const { Pool } = pg;

let connectionConfig = { 
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  }

if (process.env.NODE_ENV !== 'development') {
  connectionConfig.ssl = {
    requrire: true,
  }
}


const pool = new Pool(connectionConfig);

console.log(process.env.DB_HOST);

if (pool) {
  console.log("Database connected");
}

export const query = (text, params) => pool.query(text, params);
