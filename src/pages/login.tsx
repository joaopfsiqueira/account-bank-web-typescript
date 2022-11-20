import React from 'react';
import { Formik, Form } from 'formik';
import { createUser, loginUser } from './api/hello';
import { InputField } from '../components/InputField';
import { useRouter } from 'next/router';

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Não tem conta?
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none
          focus:ring-2 focus:ring-indigo-500"
            >
              {' '}
              Cadastre-se
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values) => {
                // actions.setSubmitting(false);
                const res = await loginUser({
                  password: values.password,
                  username: values.username,
                });

                console.log(res);
                if (res.token) {
                  const token = res.token;
                  router.push('/', token);
                }
                if (
                  res.Message === 'Username incorreto!' ||
                  res.Message === 'Senha errada!'
                ) {
                  alert('Usuário ou Senha incorretos!');
                }
              }}
            >
              <Form className="mb-0 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <InputField
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
                    <InputField
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
                  Logar
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default login;
