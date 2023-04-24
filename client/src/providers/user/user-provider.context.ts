import { User } from "./user";

export interface UserProviderContext {
  currentUser?: User;
  login(): Promise<boolean>;
  logout(): Promise<boolean>;
  register(email: string, name: string): Promise<boolean>;
}
