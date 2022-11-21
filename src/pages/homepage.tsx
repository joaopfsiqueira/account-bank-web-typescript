import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import Header from '../components/layout/Header';

export default function HomePage() {
  return (
    <div>
      <Header />

      <div> </div>
      <div> </div>
    </div>
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
