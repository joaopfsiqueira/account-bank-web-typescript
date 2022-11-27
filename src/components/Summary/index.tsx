import React, { useMemo } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

const Summary: React.FC = () => {
  const { transactions } = useTransactions();

  const summaryData = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if ('deposit') {
          acc.income += transaction.value;
        } else {
          acc.outcome += transaction.value;
        }
        acc.total = acc.income - acc.outcome;

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryData.income)}
        </strong>
      </div>

      <div>
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
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryData.total)}
        </strong>
      </div>
    </Container>
  );
};

export default Summary;
