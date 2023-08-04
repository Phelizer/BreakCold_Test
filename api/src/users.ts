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

const writeUsersToFile = (
  users: any[],
  errorCallback: (error: Error) => void
) => {
  fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      errorCallback(err);
    }
  });
};

usersRouter.get("/", (req: Request, res: Response) => {
  readUsersFromFile(
    (users) => res.send(users),
    (error) => res.status(500).send("Error reading users.json file")
  );
});

usersRouter.post("/", (req: Request, res: Response) => {
  const newUser = req.body;
  readUsersFromFile(
    (users) => {
      newUser.id = users.length + 1;
      users.push(newUser);
      writeUsersToFile(users, (error) =>
        res.status(500).send("Error writing to users.json file")
      );
      res.status(201).send(newUser);
    },
    (error) => res.status(500).send("Error reading users.json file")
  );
});

usersRouter.get("/:id", (req: Request, res: Response) => {
  readUsersFromFile(
    (users) => {
      const user = users.find((u: any) => u.id === Number(req.params.id));
      if (user) res.status(200).send(user);
      else res.status(404).send({ message: "User not found" });
    },
    (error) => res.status(500).send("Error reading users.json file")
  );
});

export default usersRouter;
