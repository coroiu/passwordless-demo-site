import React, { PropsWithChildren, useContext, useRef, useState } from "react";
import { UserProviderContext } from "./user-provider.context";
import { Client } from "@passwordlessdev/passwordless-client";
import { Config } from "../../config";
import { User } from "./user";

const Context = React.createContext<UserProviderContext | null>(null);

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const passwordless = useRef(
    new Client({
      apiKey: Config.passwordlessDev.apiPublic,
      apiUrl: Config.passwordlessDev.apiUrl,
    })
  );
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const value: UserProviderContext = {
    get currentUser() {
      return currentUser;
    },

    async login(email: string) {
      const token = passwordless.current.signinWithAlias(email);
      const result = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
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

        await passwordless.current.register(json.token, "Primary");

        // await this.loginWithToken(json.loginToken);
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
