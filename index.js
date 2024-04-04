import dotenv from "dotenv"
import server from "./server.js";

dotenv.config();

const {PORT = 3000, NODE_ENV = 'development'} = process.env;

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});