import React from "react";

import SearchComponent from "../Search";

import DocumentsTable from "./Table";

const data = Array.from({ length: 20 }, (_, i) => {
  const date = new Date().setMonth(new Date().getMonth() - 2);
  return {
    name: `${i + 1} Document name`,
    uploadDate: new Date(new Date(date).setDate(i + 1)).toISOString(),
    size: "2 MB",
    documentType: "PDF",
  };
});

const Documents = () => {
  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent
          placeholder={"Search a document"}
          onChange={console.log}
        />
      </div>
      <DocumentsTable rows={data} />
    </>
  );
};

export default Documents;
