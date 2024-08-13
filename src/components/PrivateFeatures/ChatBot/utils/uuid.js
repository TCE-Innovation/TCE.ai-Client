export const genRandomId = (length = 8) => {
  return Array.from({ length }, () =>
    ((Math.random() * 16) | 0).toString(36)
  ).join("");
};
