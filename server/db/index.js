import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
    user: 'lloydwoolacott',
    host: 'localhost',
    database: 'surfscrape',
    password:'lwoolydev',
    port: 5432,
  })

  if (pool) {
    console.log('Database connected')
  }

  export const query = (text, params) => pool.query(text, params)