import React, { useMemo } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

const Summary: React.FC = () => {
  const {
    transactionsCashin,
    transactionsCashout,
    filterCashin,
    filterCashout,
    clearFilter,
    balance,
  } = useTransactions();
  const summaryData = useMemo(() => {
    const income = transactionsCashin.reduce((acc, currentTransaction) => {
      return acc + currentTransaction.value;
    }, 0);
    const outcome = transactionsCashout.reduce((acc, currentTransaction) => {
      return acc + currentTransaction.value;
    }, 0);
    const total = balance.balance;
    return {
      income,
      outcome,
      total,
    };
  }, [transactionsCashin, transactionsCashout, balance]);

  return (
    <Container>
      <div>
        <button onClick={filterCashin}>
          <header>
            <p>Entradas</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summaryData.income)}
          </strong>
        </button>
      </div>

      <div>
        <button onClick={filterCashout}>
          <header>
            <p>Saídas</p>
          </header>
          <strong>
            -
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summaryData.outcome)}
          </strong>
        </button>
      </div>

      <div className="highlight-background">
        <button onClick={clearFilter}>
          <header>
            <p>Saldo Bancário</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summaryData.total)}
          </strong>
        </button>
      </div>
    </Container>
  );
};

export default Summary;
