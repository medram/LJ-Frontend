import { UserType } from "@/utils/types";
import { auth, logout } from "@api/auth";
import { useLocalStore, useNaiveLocalStorage } from "@hooks/index";
import { useCallback, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useLocalStore<UserType>("user", {} as UserType);
  const [getToken, setToken] = useNaiveLocalStorage("tk", "");
  const token = getToken();

  useEffect(
    useCallback(() => {
      if (token == "" && user?.id !== undefined) {
        setUser({} as UserType);
      }
    }, [])
  );

  const Authenticate = useCallback((email: string, password: string) => {
    return new Promise<UserType>((resolve, reject) => {
      auth(email, password)
        .then((data) => {
          if (!data.errors) {
            setUser(data.user);
            setToken(data.token);
            resolve(data.user);
          } else {
            reject(data.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }, []);

  const Logout = useCallback(async () => {
    // to inform the database
    let data = await logout();

    setUser({} as UserType);
    setToken("");
  }, []);

  return { user, setUser, Authenticate, Logout, token };
}

export function useUser() {
  const { user, setUser } = useAuth();

  return {
    isAuthenticated: "id" in user && user?.id ? true : false,
    isAdmin: "role" in user && user?.role == 1,
    user,
    setUser,
  };
}
