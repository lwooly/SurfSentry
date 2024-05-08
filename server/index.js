import 'dotenv/config';
import app from "./server.js";

const {PORT = 3000, NODE_ENV = 'development'} = process.env;

app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
});

export default app