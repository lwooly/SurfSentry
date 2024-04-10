import pg from 'pg'
const { Client } = pg

const {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER
} = process.env

console.log(DB_HOST, 'test')
 
const client = new Client({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
})

try {
    client.connect()
} catch (err) {
    console.log(`DB connection failed ${err}`)
}