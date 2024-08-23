export const getFileExtension = (file) => {
  function sliceName(name) {
    const [ext] = name.split(".").reverse();
    return ext.toUpperCase();
  }
  if (typeof file === "string") {
    return sliceName(file);
  }
  if (!(file instanceof File)) return null;
  return sliceName(file.name);
};

export const getFileName = (file) => {
  function getName(name = "") {
    const idx = name.lastIndexOf(".");
    if (idx === -1) return name;
    return name.slice(0, idx);
  }
  if (typeof file === "string") {
    return getName(file);
  }
  if (!(file instanceof File)) return null;
  return getName(file.name);
};

export const getFileSize = (file) => {
  if (!file?.size) return null;
  const sizeInByte = file.size;
  const sizes = ["KB", "MB", "GB"];
  const { size, index } = Array.from(
    { length: sizes.length },
    () => 1024
  ).reduce(
    (acc, i, _i) => {
      if (acc.skip) return acc;
      const n = acc.size / i;
      if (Math.round(n) <= 1024) {
        return {
          ...acc,
          skip: true,
          size: n,
        };
      }
      return { ...acc, size: n, index: acc.index + 1 };
    },
    { size: sizeInByte, skip: false, index: 0 }
  );

  return size.toFixed(2) + sizes[index] || sizes[sizes.length - 1];
};
