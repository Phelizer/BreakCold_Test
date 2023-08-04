import { makeObservable, observable } from "mobx";

interface Datum {
  title: string;
  description: string;
  id: string;
}

export class UserBLoC {
  constructor() {
    makeObservable(this, {
      data: observable,
      loading: observable,
    });
  }

  data: Datum[] = [];
  loading = false;
}
