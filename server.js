import app from "./src/app.js";
import "dotenv/config";

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(3000, () => console.log(`Server running on http://${host}:${port}`));

export default app;
