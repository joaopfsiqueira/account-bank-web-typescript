import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import Modal from 'react-modal';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import NewTransactionModal from '../components/NewTransactionModal';

import { TransactionsProvider } from '../hooks/useTransactions';

Modal.setAppElement('#__next');

export default function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['account-bank-token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
