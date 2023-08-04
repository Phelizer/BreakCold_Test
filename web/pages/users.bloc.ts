import { mockedAPI } from "@/api/mockedAPI";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { IUsersStore } from "./stores/UsersStore";
import { IUserService } from "@/services/UserService";

export class UserBLoC {
  constructor(
    private readonly usersStore: IUsersStore,
    private readonly userService: IUserService
  ) {
    makeObservable(this, {
      loading: observable,
      errorMsg: observable,
      users: computed,
    });

    this.init();
  }

  loading = false;
  errorMsg = "";

  get users() {
    return this.usersStore.users;
  }

  init = async () => {
    await runInAction(async () => {
      this.loading = true;

      try {
      } catch (error) {
        // TODO: add validation of the error with typeguard
        this.errorMsg = error?.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    });
  };
}
