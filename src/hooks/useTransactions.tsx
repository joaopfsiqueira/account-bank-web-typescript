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
  transactionsCashin: Transaction[];
  transactionsCashout: Transaction[];
  balance: Balance[];
  filterCashin(): Promise<void>;
  filterCashout(): Promise<void>;
  clearFilter(): Promise<void>;
  filterByDate(date: string): Promise<void>;
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export interface Transaction {
  value: number;
  debitedAccount: number;
  creditedAccount: number;
  id: string;
  createdAt: string;
}

export interface Balance {
  balance: string;
  id: string;
  username: string;
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
  const [balance, setBalance] = useState<Balance[]>([]);
  const [transactionsCashin, setTransactionsCashin] = useState<Transaction[]>(
    []
  );
  const [transactionsCashout, setTransactionsCashout] = useState<Transaction[]>(
    []
  );

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
      await fetch('http://localhost:4000/transactions', {
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

    setTimeout(async function returnTransactions(): Promise<void> {
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
    }, 500);
  }

  useEffect(() => {
    (async function returnTransactionsCashOut(): Promise<void> {
      const { 'account-bank-token': token } = parseCookies();
      const res = await fetch(
        'http://localhost:4000/transactions/user/cashout',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          method: 'GET',
        }
      );
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      const result = await res.json();
      setTransactionsCashout(result);
    })();

    (async function returnTransactionsCashin(): Promise<void> {
      const { 'account-bank-token': token } = parseCookies();
      const res = await fetch(
        'http://localhost:4000/transactions/user/cashin',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          method: 'GET',
        }
      );
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      const result = await res.json();
      setTransactionsCashin(result);
    })();
  }, [transactions]);

  async function filterCashin(): Promise<void> {
    const { 'account-bank-token': token } = parseCookies();
    const res = await fetch('http://localhost:4000/transactions/user/cashin', {
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
  }

  async function filterCashout(): Promise<void> {
    const { 'account-bank-token': token } = parseCookies();
    const res = await fetch('http://localhost:4000/transactions/user/cashout', {
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
  }

  async function filterByDate(date: string): Promise<void> {
    const { 'account-bank-token': token } = parseCookies();
    const res = await fetch(
      `http://localhost:4000/transactions/user/bydate?date=${date}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      }
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    const result = await res.json();

    console.log(result);
    if (result.Message) {
      setTransactions([]);
    }
    setTransactions(result);
  }

  async function clearFilter(): Promise<void> {
    const { 'account-bank-token': token } = parseCookies();
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
  }

  useEffect(() => {
    (async function userBalance(): Promise<any> {
      const { 'account-bank-token': token } = parseCookies();
      const res = await fetch('http://localhost:4000/users/balance', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      const result = await res.json();
      setBalance(result.balance);
    })();
  }, [balance]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        transactionsCashout,
        transactionsCashin,
        filterCashin,
        filterCashout,
        clearFilter,
        filterByDate,
        balance,
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
