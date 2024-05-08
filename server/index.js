import "dotenv/config";
import appSrc from "./server.js";
import "./tasks/tasks.js";
import serverless from "serverless-http";

let app = appSrc;

const { PORT = 3000, NODE_ENV = "development" } = process.env;

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
  });
} else {
    app = serverless(app)
}

export default app

