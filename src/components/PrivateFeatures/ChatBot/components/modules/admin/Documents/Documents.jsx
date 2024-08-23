import React from "react";

import SearchComponent from "../Search";

import DocumentsTable from "./Table";
import { genDocuments } from "../../../../utils/data";

const data = genDocuments();

const Documents = () => {
  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent
          placeholder={"Search a document"}
        />
      </div>
      <DocumentsTable rows={data} />
    </>
  );
};

export default Documents;
