import 'dotenv/config';
import server from "./server.js";

const {PORT = 3000, NODE_ENV = 'development'} = process.env;

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});