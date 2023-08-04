import { mockedAPI } from "@/api/mockedAPI";
import { IUsersStore } from "@/pages/stores/UsersStore";
import { runInAction } from "mobx";

export interface IUserService {
  getUsers(): Promise<void>;
}

export class UserService {
  constructor(private usersStore: IUsersStore) {}

  async getUsers() {
    // TODO: add error handling
    const response = await mockedAPI();
    // TODO: add a layer of validation with typeguards or schemas
    // the layer should not leak into Services
    const users = await response.json();

    await runInAction(async () => {
      this.usersStore.users = users;
    });
  }
}
