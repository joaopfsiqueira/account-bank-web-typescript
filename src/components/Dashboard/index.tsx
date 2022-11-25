import React from 'react';
import Summary from '../Summary';
import TransactionsTable from '../TransactionsTable';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}

export default Dashboard;