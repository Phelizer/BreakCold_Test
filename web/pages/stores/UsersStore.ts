import { User } from "@/models/User.model";
import { makeObservable, observable } from "mobx";

export interface IUsersStore {
  users: User[];
}

class UsersStore implements IUsersStore {
  constructor() {
    makeObservable(this, {
      users: observable,
    });
  }

  users: User[] = [];
}

export const userStoreInstance = new UsersStore();
