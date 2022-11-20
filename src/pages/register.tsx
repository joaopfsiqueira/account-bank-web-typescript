import React from 'react';
import { Formik, Form } from 'formik';
import { createUser, loginUser } from './api/hello';
import { InputField } from '../components/InputField';
import { useRouter } from 'next/router';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

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
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values, { setErrors }) => {
                // actions.setSubmitting(false);
                const res = await createUser({
                  password: values.password,
                  username: values.username,
                });

                if (res.Message != 'Usuário criado com sucesso!') {
                  setErrors(toErrorMap(res));
                } else {
                  //worked.
                  router.push('/login');
                }

                if (res.Message === 'Usuário criado com sucesso!') {
                }
                if (
                  res.Message ===
                  'Senha deve conter ao menos 8 caracteres, uma letra maíuscula, 1 caracter especial e 1 número!'
                ) {
                  alert(
                    'Senha deve conter ao menos 8 caracteres, uma letra maíuscula, 1 caracter especial e 1 número!'
                  );
                }
                if (res.Message === 'Usuario já cadastrado!') {
                  alert('Usuario já cadastrado!');
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
                  Registrar
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default register;
