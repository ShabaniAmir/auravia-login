import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    if (
      token &&
      (!localStorage.getItem("token") ||
        localStorage.getItem("token") !== token)
    ) {
      localStorage.setItem("token", token);
    }
    if (!token && !loading) {
      console.log("removing token");
      localStorage.removeItem("token");
    }
  }, [token]);

  function login(email: string, password: string) {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        setToken(data.token);
        router.push("/");
      });
  }

  function logout() {
    setToken(null);
    if (typeof window !== "undefined") router.push("/");
  }

  function signup(email: string, password: string) {
    return fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        setToken(data.token);
        router.push("/");
      });
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useRequireAuth() {
  const router = useRouter();
  const { token, loading } = useAuth();
  useEffect(() => {
    if (!token && !loading) {
      router.push("/auth/login");
    }
  }, [token]);
}

export function ProtectedPage({ children }: React.PropsWithChildren<{}>) {
  useRequireAuth();
  const { loading } = useAuth();
  if (loading) return <></>;
  return <>{children}</>;
}
