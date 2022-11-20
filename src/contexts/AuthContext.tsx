import { createContext, useState } from 'react';
import { loginUser } from '../pages/api/Apis';
import { setCookie } from 'nookies'; //usando nookies para salvar os cookies.
import Router from 'next/router';

type UserToken = {
  username: any;
};

type AuthContextType = {
  user: UserToken;
  isAuthenticated: boolean;
  signIn: (body: Body) => Promise<void>;
};

type Body = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserToken | any>(null);

  const isAuthenticated = !!user;

  async function signIn(body: Body) {
    const { token, username } = await loginUser({
      password: body.password,
      username: body.username,
    });

    setCookie(undefined, 'account-bank-token', token, {
      maxAge: 60 * 60 * 24, //24h
    });

    setUser(username);
    Router.push('/homepage');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
