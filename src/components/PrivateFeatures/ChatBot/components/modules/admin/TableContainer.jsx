import React from "react";

import { Table } from "../../common";

const TableContainer = ({ rows, columns, style = {}, ...props }) => {
  return (
    <div className="admin-table-wrapper">
      <div className="admin-table-container" style={style}>
        <Table data={rows} columns={columns} {...props} />
      </div>
    </div>
  );
};

export default TableContainer;
