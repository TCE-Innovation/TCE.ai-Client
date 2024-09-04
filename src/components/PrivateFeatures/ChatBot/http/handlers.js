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
      errorMessage.length > 100
        ? defaultErrorMessage
        : errorObject?.error || defaultErrorMessage,
  };
};

export const formatResponseData = (result) => {
  const { data, success, message } = result;
  try {
    const { success: successMessage, error: errorMessage, ...rest } =
      data || {};
    if (errorMessage) {
      return {
        data: rest,
        success: false,
        message: data.error,
      };
    }
    if (successMessage && success) {
      return {
        data: rest,
        success,
        message: successMessage,
      };
    }
    return {
      data: rest,
      success,
      message,
    };
  } catch (err) {
    console.log(err);
  }
};
