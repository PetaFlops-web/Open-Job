import express from "express";
import routerUser from "./routes/users.route.js";
import routerAuthentication from "./routes/authentication.route.js";
import errorHandler from "./middlewares/error.js";

const app = express();

app.use(express.json());

// router
app.use("/users", routerUser);
app.use("/authentications", routerAuthentication);
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
export default app;
