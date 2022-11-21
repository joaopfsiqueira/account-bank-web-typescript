import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { userInformations } from './api/Apis';
import { parseCookies } from 'nookies';

type Dados = { balance: string; id: string; username: string };

export default function HomePage() {
  const [dados, setDados] = useState<Dados | null>(null);
  const { user } = useContext(AuthContext);
  const { 'account-bank-token': token } = parseCookies();

  useEffect(() => {
    // renomeando nosso token para apenas token

    if (token) {
      userInformations(token).then((response) => setDados(response));
    }
  });

  return (
    <>
      <h1 className="text-red-500 text-xl">
        Bem vindo{' '}
        {dados?.username.charAt(0).toUpperCase() + dados?.username.slice(1)}
      </h1>
      <h1 className="text-red-500 text-xl">Saldo: {dados?.balance}</h1>
      <h1 className="text-red-500 text-xl">Conta: {dados?.id}</h1>
    </>
  );
}
