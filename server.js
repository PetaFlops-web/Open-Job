import app from "./src/app.js";
import "dotenv/config";
import { connectRabbitMQ } from "./src/export/export.config.js";

const host = process.env.HOST;
const port = process.env.PORT;

const startServer = async () => {
  await connectRabbitMQ(); // connect dulu sebelum server jalan

  app.listen(port, () =>
    console.log(`Server running on http://${host}:${port}`),
  );
};

startServer();
