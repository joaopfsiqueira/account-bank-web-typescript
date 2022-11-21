import { useContext, useEffect, useState } from 'react';
import { userInformations } from '../../pages/api/Apis';
import { parseCookies } from 'nookies';

type Dados = { balance: string; id: string; username: string };

export default function Header() {
  const [dados, setDados] = useState<Dados | null>(null);
  const { 'account-bank-token': token } = parseCookies();
  useEffect(() => {
    // renomeando nosso token para apenas token

    if (token) {
      userInformations(token).then((response) => setDados(response));
    }
  });
  return (
    <header className="bg-gray-100 font-medium text-indigo-600 hover:text-indigo-500 h-10 shadow-lg ">
      <div className="flex justify-between items-center p-2">
        <h1>Account Bank</h1>
        <h1>
          Bem vindo{' '}
          {dados?.username.charAt(0).toUpperCase() + dados?.username.slice(1)}
        </h1>
        <button>Deslogar</button>
      </div>
    </header>
  );
}
