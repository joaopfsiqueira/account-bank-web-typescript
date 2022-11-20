import React from 'react';

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Já tem conta?
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none
          focus:ring-2 focus:ring-indigo-500"
            >
              {' '}
              Logue
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className=""
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className=""
                  />
                </div>
              </div>

              {/* <div className="flex items-center">
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  {' '}
                  Esqueceu sua senha?{' '}
                </a>
              </div> */}

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default register;
