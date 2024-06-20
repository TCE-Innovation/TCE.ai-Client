export const responseHandler = (response) => {
  return {
    data: response.data,
    success: true,
    message: "",
  };
};

export const errorHandler = (error) => {
  const defaultErrorMessage = "Something went wrong!";
  const errorObject = error?.response?.data;
  const errorMessage = JSON.stringify(errorObject || defaultErrorMessage);
  console.error(errorMessage);
  return {
    data: null,
    success: false,
    message:
      errorMessage.length > 50
        ? defaultErrorMessage
        : errorObject?.error || defaultErrorMessage,
  };
};
