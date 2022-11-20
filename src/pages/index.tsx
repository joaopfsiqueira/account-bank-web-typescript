import type { NextPage } from 'next';
import { createUser } from './api/hello';

const Index: NextPage = () => {
  return (
    <>
      <h1 className="text-red-500 text-xl">Hello world</h1>
      <button
        onClick={() => {
          createUser();
        }}
      >
        clica
      </button>
    </>
  );
};

export default Index;
