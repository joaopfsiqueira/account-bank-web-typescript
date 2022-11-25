export const toErrorMap = (field: string, message: string, erro: boolean) => {
  const errorMap: Record<string, string> = {};

  field = 'password';
  message = 'Usuário ou senha incorretos!';

  errorMap[field] = message;
  return errorMap;
};
