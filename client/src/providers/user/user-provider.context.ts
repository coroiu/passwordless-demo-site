import { User } from "./user";

export interface UserProviderContext {
  currentUser?: User;
  login(email: string): Promise<boolean>;
  // loginWithToken(loginToken: string): Promise<boolean>;
  logout(): Promise<boolean>;
  register(email: string, name: string): Promise<boolean>;
}
