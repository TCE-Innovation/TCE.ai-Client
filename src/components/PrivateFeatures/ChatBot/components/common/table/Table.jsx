import React, { useEffect, useState } from "react";

import Wrapper from "./style";

const SORT_ORDER = ["default", "ascending", "descending"];

const Table = ({
  data,
  columns,
  children,
  classNames = "",
  onRowClick = () => {},
}) => {
  const [currentList, setCurrentList] = useState(data);
  const [sortOrder, setSortOrder] = useState([]);

  const updateSortOrder = (colIndex) => {
    setSortOrder((prev) => {
      return prev.map((order, id) => {
        if (id === colIndex) return (order + 1) % SORT_ORDER.length;
        return order;
      });
    });
  };

  const sortTable = (key, order) => {
    setCurrentList((prev) => {
      if (SORT_ORDER[order] === "ascending")
        return prev.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
      if (SORT_ORDER[order] === "descending") {
        return prev.slice().sort((a, b) => (a[key] > b[key] ? -1 : 1));
      }
      return data;
    });
  };

  useEffect(() => {
    setSortOrder(
      columns.map(() => {
        return 0;
      })
    );
  }, [columns]);

  const updateTable = (columnKey, columnIndex) => {
    const nextOrder = (sortOrder[columnIndex] + 1) % SORT_ORDER.length;
    updateSortOrder(columnIndex);
    sortTable(columnKey, nextOrder);
  };

  return (
    <Wrapper>
      <table className={`chatbot-table-view ${classNames}`}>
        <thead className="w-100">
          <tr>
            {columns.map((column, i) => {
              const showDefaultHover = column.sort && !column.renderSort;
              return (
                <th
                  style={{ width: column.width ? column.width : "auto" }}
                  className={`${showDefaultHover ? "onhover-header-cell" : ""}`}
                  key={i}
                >
                  <div
                    className={`d-flex gap-2 align-items-center`}
                    onClick={() => {
                      if (!showDefaultHover) return;
                      updateTable(column.key, i);
                    }}
                  >
                    <span>{column.title}</span>
                    {column.sort && (
                      <>
                        {column.renderSort
                          ? column.renderSort({
                              handleSort: () => {
                                updateTable(column.key, i);
                              },
                              currentOrder: SORT_ORDER[sortOrder[i]],
                            })
                          : null}
                      </>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentList?.length ? (
            currentList.map((item, i) => {
              return (
                <tr key={i} onClick={() => onRowClick(item)}>
                  {columns.map((column, j) => {
                    const value =
                      column.renderCell?.(item) ||
                      column.accessor?.(item) ||
                      item[column.key] ||
                      "<invalid_indexing>";
                    return (
                      <td key={`${i}-${j}`}>
                        <div>{value}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length}>
                {children ? (
                  children
                ) : (
                  <div
                    style={{
                      color: "var(--chatbot-grey)",
                      textAlign: "center",
                    }}
                  >
                    no data
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Table;
