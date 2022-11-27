import { createContext, useEffect, useState } from 'react';
import { loginUser, userInformations } from '../pages/api/Apis';
import { setCookie, parseCookies, destroyCookie } from 'nookies'; //usando nookies para salvar os cookies. // lendo os cookies com parseCookies
import Router from 'next/router';

type UserToken = {
  username: string;
};

type AuthContextType = {
  user: UserToken | null;
  isAuthenticated: boolean;
  signIn: (body: Body) => Promise<void | any>;
  signOut: () => Promise<void>;
};

type Body = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserToken | null>(null);

  const isAuthenticated = !!user;

  //assim que o componente for criado, vai disparar a função abaixo.
  // vou checar se o token já existe,
  useEffect(() => {
    // renomeando nosso token para apenas token
    const { 'account-bank-token': token } = parseCookies();

    if (token) {
      userInformations(token).then((response) => setUser(response.username));
    }
  }, []);

  async function signIn(body: Body): Promise<void | any> {
    const response = await loginUser({
      password: body.password,
      username: body.username,
    });

    if (response.Message) {
      return response;
    }

    setCookie(undefined, 'account-bank-token', response.token, {
      maxAge: 60 * 60 * 24, //24h
    });

    setUser(response.username);
  }

  async function signOut(): Promise<void> {
    destroyCookie(undefined, 'account-bank-token');
    setUser(null);
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
