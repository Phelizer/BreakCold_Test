import express, { Application, Request, Response } from "express";
import entitiesRouter from "./clean_me.js"; // import entities router
import usersRouter from "./users"; // import the users router
import bodyParser from "body-parser";

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT: number = 3001;

app.use("/", entitiesRouter); // use entities router at path '/entities'
app.use("/users", usersRouter);

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
