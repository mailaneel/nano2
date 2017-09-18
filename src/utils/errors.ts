export const createError = (
  message: string,
  type: string,
  code?: number,
  data?: any,
  expose: boolean = false,
) => {
  const error: any = new Error(message);
  error.name = type;
  error.type = type;
  error.code = code;
  error.data = data;
  error.expose = expose === true;

  return error;
};

export const createApiError = (
  message: string,
  type: string,
  code?: number,
  data?: any,
  expose: boolean = true,
) => {
  return createError(message, type, code, data, expose);
};

export const createFrameworkError = (
  message: string,
  type: string,
  code?: number,
  data?: any,
  expose?: boolean,
) => {
  const error = createError(message, type, code, data, expose);
  error.isFramework = true;

  return error;
};
