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

export const download = (
  url,
  name,
  callback = () => {},
  { onAbort = () => {}, onSuccess = () => {} } = {}
) => {
  return new Promise(async (res) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch(url, { signal: signal });

      const contentLength = response.headers.get("Content-Length");
      const totalSize = contentLength ? parseInt(contentLength, 10) : 0;

      // Create a reader to track the progress
      const reader = response.body.getReader();
      let receivedLength = 0; // Keep track of the number of bytes received
      let chunks = []; // Store the downloaded chunks

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        if (totalSize) {
          const progress = (receivedLength / totalSize) * 100;
          callback(progress);
          // console.log({ progress });
        } else {
          console.log(`Received ${receivedLength} bytes`);
        }
      }

      // Combine the chunks into a single Uint8Array
      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const blob = new Blob([chunksAll]);
      const link = document.createElement("a");
      const objectURL = URL.createObjectURL(blob);
      res(() => {
        onSuccess();
        link.href = objectURL;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      if (error.name === "AbortError") {
        onAbort();
        console.log("Download aborted");
      } else {
        console.error("Download failed:", error);
      }
    }
  });
};

export const getDirectFiles = (e) => {
  const files = [e.target.file]
    .concat(
      Array.from(e.target.files).filter((file) => {
        const relativePath = file.webkitRelativePath || "";
        return relativePath.lastIndexOf("/") === relativePath.indexOf("/");
      })
    )
    .filter(Boolean);
  return files;
};
