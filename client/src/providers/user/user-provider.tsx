import React, { PropsWithChildren, useContext } from "react";
import { UserProviderContext } from "./user-provider.context";
import { Client } from "@passwordlessdev/passwordless-client";
import { Config } from "../../config";

var passwordless = new Client({
  apiKey: Config.passwordlessDev.apiPublic,
});

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

    async register(email: string, name: string) {
      try {
        const result = await fetch("/api/user/register", {
          method: "POST",
          body: JSON.stringify({ email, name }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = (await result.json()) as {
          token: string;
          loginToken: string;
        };

        await passwordless.register(json.token, "Primary");
        return true;
      } catch (error) {
        console.error("Failed to register", error);
        return false;
      }
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
