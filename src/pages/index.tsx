import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';
import { AuthContext } from '../contexts/AuthContext';

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const [erro, setErro] = useState<Boolean>(false);
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-10 px-4 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
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
              onSubmit={async (values, { setErrors }) => {
                // actions.setSubmitting(false);
                const res = await signIn({
                  password: values.password,
                  username: values.username,
                });

                if (res !== undefined) {
                  router.push('/homepage');
                } else {
                  setErro(true);
                  let field = 'password';
                  let Message = 'Usuário ou senha incorretos!';
                  setErrors(toErrorMap(field, Message, erro));
                  // setErrors(toErrorMap(res));
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
