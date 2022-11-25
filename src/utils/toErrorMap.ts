type Erro = {
  field: string;
  Message: string;
  erro: Boolean;
};

export const toErrorMap = (errors: Erro) => {
  const errorMap: Record<string, string> = {};

  if (errors.Message.includes('length must be at least 3 characters long')) {
    errors.field = 'username';
    errors.Message = 'Usuário precisa ter ao menos 3 caracteres';

    errorMap[errors.field] = errors.Message;
    return errorMap;
  }

  if (errors.Message.includes('Usuario já cadastrado!')) {
    errors.field = 'username';
    errors.Message = 'Usuario já cadastrado!';

    errorMap[errors.field] = errors.Message;
    return errorMap;
  }

  if (errors.Message.includes('Usuário ou senha incorretos!')) {
    errors.field = 'password';
    errors.Message = 'Usuário ou senha incorretos!';

    errorMap[errors.field] = errors.Message;
    return errorMap;
  }

  errorMap[errors.field] = errors.Message;
  return errorMap;
};
