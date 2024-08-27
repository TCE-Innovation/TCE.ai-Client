export const emailRegex = () => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
};

export const nullableRegex = () => {
  return /^[\w-\s]+$/;
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

export const toFormData = (params) => {
  const formdata = new FormData();
  for (const key in params) {
    const value = params[key];
    formdata.append(key, value);
  }
  return formdata;
};

export const capitalize = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const minMaxRegex = (min, max) => {
  const pattern = new RegExp(`^.{${min ? min : ""},${max ? max : ""}}$`);
  return pattern;
};
