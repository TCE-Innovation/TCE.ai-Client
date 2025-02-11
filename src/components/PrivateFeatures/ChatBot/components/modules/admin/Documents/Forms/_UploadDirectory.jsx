import React from "react";

import Upload from "./_Upload";

const UploadDirectory = ({ name, title, id }) => {
  return (
    <Upload
      name={name}
      directory=""
      webkitdirectory=""
      mozdirectory=""
      id={id}
      title={title}
    />
  );
};

export default UploadDirectory;
