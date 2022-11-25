import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { setCookie, parseCookies } from 'nookies'; //usando nookies para salvar os cookies. // lendo os cookies com parseCookies

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface Transaction {
  value: number;
  debitedAccount: number;
  creditedAccount: number;
  id: string;
  createdAt: string;
}

type TransactionInput = {
  value: number;
  creditedUsername: string;
};

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const { 'account-bank-token': token } = parseCookies();
    (async function returnTransactions(): Promise<void> {
      const res = await fetch('http://localhost:4000/transactions/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      const result = await res.json();
      setTransactions(result);
    })();
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const { 'account-bank-token': token } = parseCookies();
    (async function insertTransaction(): Promise<void> {
      await fetch('http://localhost:4000/transactions/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          value: transaction.value,
          creditedUsername: transaction.creditedUsername,
        }),
        method: 'POST',
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
    })();
    (async function returnTransactions(): Promise<void> {
      const res = await fetch('http://localhost:4000/transactions/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      const result = await res.json();
      setTransactions(result);
    })();
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
