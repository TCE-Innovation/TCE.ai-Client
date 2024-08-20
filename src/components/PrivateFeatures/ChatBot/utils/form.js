export const emailRegex = () => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
};

export const filterByPatternsFactory = (str, ...fields) => (array) => {
  if (!str || fields.length === 0) return array;
  const pattern = new RegExp(str, "gi");
  return array.filter((item) => {
    return fields.some((field) => {
      const value = item[field] || "";
      return pattern.test(value);
    });
  });
};
