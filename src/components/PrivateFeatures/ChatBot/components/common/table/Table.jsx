import React, { useEffect, useMemo, useRef, useState } from "react";

import Wrapper from "./style";

import { Loader } from "../../common";

const SORT_ORDER = ["default", "ascending", "descending"];

const loadingElement = (
  <>
    <br />
    <Loader size={3} />
    <br />
  </>
);

const Table = ({
  data,
  columns,
  children,
  classNames = "",
  isLoading = true,
  onRowClick = null,
  insertingRow = false,
  updatingRowsIds = [],
}) => {
  const [loading, setLoading] = useState(isLoading);
  const [currentList, setCurrentList] = useState(() =>
    typeof data === "function" ? [] : []
  );
  const [sortOrder, setSortOrder] = useState([]);

  const dataRef = useRef([]);

  useEffect(() => {
    (async () => {
      try {
        if (typeof data === "function") {
          const rows = await data();
          if (Array.isArray(rows)) {
            setCurrentList(rows);
            dataRef.current = rows;
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setCurrentList([]);
      }
    })();
  }, [data]);

  const insertingRowElement = useMemo(() => {
    if (insertingRow)
      return (
        <tr className="position-relative">
          <td colSpan={columns.length}>{loadingElement}</td>
        </tr>
      );
  }, [insertingRow, columns]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setCurrentList(data);
      dataRef.current = data;
    }
  }, [data]);

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
      return dataRef.current;
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

  const getAlignment = (align) => {
    return align === "center"
      ? "justify-content-center"
      : align === "end"
      ? "justify-content-end"
      : "";
  };

  return (
    <Wrapper>
      <table
        className={`chatbot-table-view ${classNames}`}
        style={{ height: isLoading ? "100%" : "auto" }}
      >
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
                    className={`d-flex gap-2 align-items-center ${getAlignment(
                      column.align
                    )}`}
                    onClick={() => {
                      if (!showDefaultHover || isLoading) return;
                      updateTable(column.key, i);
                    }}
                  >
                    <span>{column.title}</span>
                    {column.sort && (
                      <>
                        {!isLoading && column.renderSort
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
          {insertingRowElement}
          {currentList?.length ? (
            currentList.map((item, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(item)}
                  className={`position-relative ${
                    onRowClick ? "" : "disable-hover"
                  }`}
                >
                  {updatingRowsIds?.length &&
                  updatingRowsIds.some((id) => id === item.id) ? (
                    <td
                      style={{ pointerEvents: "none", userSelect: "none" }}
                      colSpan={columns.length}
                    >
                      {loadingElement}
                    </td>
                  ) : (
                    columns.map((column, j) => {
                      const value =
                        column.renderCell?.(item) ||
                        column.accessor?.(item) ||
                        item[column.key] ||
                        "<invalid_indexing>";
                      return (
                        <td key={`${i}-${j}`}>
                          <div
                            style={{
                              ...(column.maxWidth
                                ? {
                                    textWrap: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxWidth: column.maxWidth,
                                  }
                                : {}),
                            }}
                            className={`d-flex align-items-center ${getAlignment(
                              column.align
                            )}`}
                          >
                            {value}
                          </div>
                        </td>
                      );
                    })
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <div
                  style={{
                    position: "relative",
                    color: "var(--chatbot-grey)",
                    textAlign: "center",
                    backgroundColor: "var(--chatbot-light-grey)",
                    height: "100%",
                    outline: "1px solid var(--chatbot-light-grey)",
                  }}
                >
                  {currentList.length ? null : loading ? (
                    loadingElement
                  ) : children ? (
                    children
                  ) : (
                    <>no data</>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Table;
