const createResponse = (message, data) => {
  return {
    message: message || "",
    data: data || "",
  };
};

export default createResponse;
