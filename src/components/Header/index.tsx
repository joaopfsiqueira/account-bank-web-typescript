import React, { useContext, useState } from 'react';

import { Container, Content } from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { useTransactions } from '../../hooks/useTransactions';

interface HeaderProps {
  onOpenNewTransactionModal(): void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNewTransactionModal }) => {
  const { signOut } = useContext(AuthContext);
  const { filterByDate } = useTransactions();
  const [date, setDate] = useState<string>('');

  return (
    <Container>
      <Content>
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => filterByDate(date)}
        ></input>
        <button onClick={signOut}>Deslogar</button>
      </Content>
    </Container>
  );
};

export default Header;
