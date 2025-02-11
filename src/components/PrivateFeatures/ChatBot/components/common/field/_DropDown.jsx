import { useEffect, useState } from "react";
import FormContext, { useFieldValue } from "../../contexts/FormContext";
import Field from "./Field";
import { SearchIcon } from "../../icons";

import { Loader } from "../../common";
import { filterByPatternsFactory } from "../../../utils/form";

const DropDown = ({
  items,
  name,
  search = false,
  searchPlaceholder = "Search...",
  searchLabel = "",
  listRenderer,
  onChange = () => {},
  loading = false,
}) => {
  const { changeValue, value: currentValue } = useFieldValue(name);

  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleSearch = (value) => {
    const filterByLabel = filterByPatternsFactory(value, "label");
    setCurrentItems(filterByLabel(items));
  };

  const handleClick = (item) => {
    changeValue(item.value);
    onChange(item.value);
  };

  return (
    <div className="chatbot-dropdown-container position-absolute left-0 w-100">
      {!loading && search && (
        <FormContext initialValues={{ search: "" }}>
          <div className="dropdown-search-field">
            {searchLabel && (
              <div style={{ fontSize: "0.75em", color: "var(--chatbot-grey)" }}>
                {searchLabel}
              </div>
            )}
            <Field
              showError={false}
              name={"search"}
              placeholder={searchPlaceholder}
              leftAddon={<SearchIcon />}
              onChange={handleSearch}
              autoComplete={"off"}
            />
          </div>
        </FormContext>
      )}
      {loading ? (
        <div className="search-loading-wrapper">
          <Loader />
        </div>
      ) : currentItems.length ? (
        currentItems.map((item) => {
          return (
            <div
              className={`${item.value === currentValue ? "selected" : ""}`}
              key={item.value}
              onClick={() => handleClick(item)}
            >
              {listRenderer?.(item) || item.label}
            </div>
          );
        })
      ) : (
        <div className="text-center" style={{ pointerEvents: "none" }}>
          no items
        </div>
      )}
    </div>
  );
};

export default DropDown;
