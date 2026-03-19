import express from "express";
import routerUser from "./routes/users.route.js";
import routerAuthentication from "./routes/authentication.route.js";
import routerCompany from "./routes/compenies.route.js";
import routerCategories from "./routes/categories.route.js";
import routerJobs from "./routes/jobs.route.js";
import routerApplication from "./routes/application.route.js";
import routerBookMark from "./routes/bookmarks.route.js";
import routerDocument from "./routes/documents.route.js";
import errorHandler from "./middlewares/error.js";
import process from "process";

const app = express();

app.use("/documents/pdf", express.static(`${process.cwd()}/documents/pdf`));
app.use(express.json());

// router
app.use("/users", routerUser);
app.use("/authentications", routerAuthentication);
app.use("/companies", routerCompany);
app.use("/categories", routerCategories);
app.use("/jobs", routerJobs);
app.use("/applications", routerApplication);
app.use("/bookmarks", routerBookMark);
app.use("/documents", routerDocument);
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

export default app;
