import React from "react";

import Upload from "./_Upload";

const UploadFiles = ({ name, title, id }) => {
  return <Upload name={name} multiple title={title} id={id} />;
};

export default UploadFiles;
