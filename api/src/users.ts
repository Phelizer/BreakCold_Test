import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const usersRouter = Router();

const readUsersFromFile = (
  callback: (users: any[]) => void,
  errorCallback: (error: Error) => void
) => {
  // TODO: need to read all files from the directory and return an array
  const userFilePath = path.join(__dirname, "..", "data", "users", "1.json");
  fs.readFile(userFilePath, "utf-8", (err, data) => {
    if (err) {
      console.log({ err });
      console.log(__dirname);
      console.log(__filename);
      errorCallback(err);
    } else {
      callback(JSON.parse(data));
    }
  });
};

usersRouter.get("/", (req: Request, res: Response) => {
  readUsersFromFile(
    (users) => res.send(users),
    (error) => res.status(500).send("Error reading users.json file")
  );
});

export default usersRouter;
