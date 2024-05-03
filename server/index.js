import 'dotenv/config';
import app from "./server.js";
import './tasks/tasks.js'

const {PORT = 3000, NODE_ENV = 'development'} = process.env;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});

export default app;