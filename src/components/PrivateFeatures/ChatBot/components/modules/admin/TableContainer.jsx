import React from "react";

import { Table } from "../../common";

const TableContainer = ({ rows, columns,...props }) => {
  return (
    <div className="admin-table-container">
      <Table data={rows} columns={columns} {...props} />
    </div>
  );
};

export default TableContainer;
