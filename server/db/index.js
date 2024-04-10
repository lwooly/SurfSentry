import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
  host: 'localhost',
  user: 'lloydwoolacott',
  database: 'surfscrape',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})