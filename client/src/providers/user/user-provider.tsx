import React, { PropsWithChildren, useContext } from "react";
import { UserProviderContext } from "./user-provider.context";

const Context = React.createContext<UserProviderContext | null>(null);

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const value: UserProviderContext = {
    currentUser: undefined,

    async login() {
      return false;
    },

    async logout() {
      return false;
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUserProvider() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("UserProvider is not present in this context.");
  }

  return value;
}
