import React from 'react';

import { Container, Content } from './styles';

import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal(): void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNewTransactionModal }) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
};

export default Header;
