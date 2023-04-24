import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

  useEffect(() => {
    const storedData = localStorage.getItem("currentUser");
    if (storedData === null) {
      return;
    }

    setCurrentUser(JSON.parse(storedData));
  }, []);

  const value: UserProviderContext = {
    get currentUser() {
      return currentUser;
    },

    async login(email: string) {
      const token = await passwordless.current.signinWithAlias(email);
      const result = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status > 299) {
        console.error("Login failed", await result.text());
        return false;
      }

      const user = await result.json();
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return true;
    },

    async logout() {
      localStorage.removeItem("currentUser");
      setCurrentUser(undefined);
    },

    async register(email: string, name: string) {
      try {
        const registerResult = await fetch("/api/user/register", {
          method: "POST",
          body: JSON.stringify({ email, name }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const registerJson = (await registerResult.json()) as {
          token: string;
          loginToken: string;
        };

        await passwordless.current.register(registerJson.token, "Primary");

        const loginResult = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ loginToken: registerJson.loginToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (loginResult.status > 299) {
          console.error("Login failed", await loginResult.text());
          return false;
        }
        const user = await loginResult.json();
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        return true;
      } catch (error) {
        console.error("Failed to register", error);
        return false;
      }
    },

    async createCredential(nickname: string) {
      if (currentUser === undefined) return false;

      const result = await fetch("/api/user/credentials", {
        method: "POST",
        headers: {
          "user-id": currentUser.userId,
          "Content-Type": "application/json",
        },
      });
      const json = (await result.json()) as {
        token: string;
      };

      await passwordless.current.register(json.token, nickname);
      return true;
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
