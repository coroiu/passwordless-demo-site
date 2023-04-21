import { User } from "./user";

export interface UserProviderContext {
  currentUser?: User;
  login(): Promise<boolean>;
  logout(): Promise<boolean>;
}
