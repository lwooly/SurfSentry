import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "surfscrape",
  user: "lloydwoolacott",
  password: "lwoolydev",
});

console.log(process.env.DB_HOST);

if (pool) {
  console.log("Database connected");
}

export const query = (text, params) => pool.query(text, params);
