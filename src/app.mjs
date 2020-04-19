import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import logger from "logger";
// import indexRouter from "/routes/index";
// import usersRouter from "/routes/users";

const app = express();
const port = 3000;

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.listen(port, "localhost", () => {
  // console.log(
  //     `${lang("app", "server.running")} http://${env.HOST}:${env.PORT}`
  // );
});

export default app;
