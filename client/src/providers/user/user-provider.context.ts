import { User } from "./user";

export interface UserProviderContext {
  currentUser?: User;
  login(email: string): Promise<boolean>;
  logout(): Promise<void>;
  register(email: string, name: string): Promise<boolean>;
  createCredential(nickname: string): Promise<boolean>;
}
