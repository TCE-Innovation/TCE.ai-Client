export const responseHandler = (response) => {
  return {
    data: response.data,
    success: true,
    message: "",
  };
};

export const errorHandler = (error) => {
  const defaultErrorMessage = "Something went wrong!";
  const errorMessage = JSON.stringify(
    error?.response?.data || defaultErrorMessage
  );
  console.error(errorMessage);
  return {
    data: null,
    success: false,
    message: errorMessage.length > 50 ? defaultErrorMessage : errorMessage,
  };
};
