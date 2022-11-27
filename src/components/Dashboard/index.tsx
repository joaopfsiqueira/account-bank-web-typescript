import React from 'react';
import Summary from '../Summary';
import TransactionsTable from '../TransactionsTable';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { transactions } = useTransactions();
  return (
    <Container>
      <Summary />
      {transactions.length != 0 && (
        <TransactionsTable transactions={transactions} />
      )}
    </Container>
  );
};

export default Dashboard;
