import React, { useEffect, useMemo, useState } from "react";
import Field from "./Field";

import { DownIcon, SearchIcon } from "../../icons";
import { useOutsideClick } from "../../../hooks";
import FormContext, { useFieldValue } from "../../contexts/FormContext";

const DropDown = ({
  items,
  name,
  search = false,
  searchPlaceholder = "Search...",
  searchLabel = "",
  listRenderer,
  onChange = () => {},
}) => {
  const { changeValue } = useFieldValue(name);

  const [currentItems, setCurrentItems] = useState(items);

  const handleSearch = (value) => {
    const pattern = new RegExp(value, "gi");
    setCurrentItems(items.filter((item) => pattern.test(item.label)));
  };

  const handleClick = (item) => {
    changeValue(item.value);
    onChange(item.value);
  };

  return (
    <div className="chatbot-dropdown-container position-absolute left-0 w-100">
      {search && (
        <FormContext initialValues={{ search: "" }}>
          <div className="dropdown-search-field">
            {searchLabel && (
              <div style={{ fontSize: "0.75em", color: "var(--chatbot-grey)" }}>
                {searchLabel}
              </div>
            )}
            <Field
              name={"search"}
              placeholder={searchPlaceholder}
              leftAddon={<SearchIcon />}
              onChange={handleSearch}
            />
          </div>
        </FormContext>
      )}
      {currentItems.length ? (
        currentItems.map((item) => {
          return (
            <div key={item.value} onClick={() => handleClick(item)}>
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

const SelectField = ({
  name,
  label = "",
  placeholder,
  extractor,
  items,
  onChange = () => {},
  ...dropDownProps
}) => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  const { value } = useFieldValue(name);

  const selectedValueLabel = useMemo(() => {
    const item = list.find((item) => item.value === value);
    const { listRenderer } = dropDownProps;
    if (item && listRenderer) {
      return <>{listRenderer(item)}</>;
    }
    return item?.label ?? "";
  }, [value, list]);

  useEffect(() => {
    setList(items.map((item, i) => extractor(item, i)));
  }, [items]);

  const { targetRef } = useOutsideClick({
    onClickOutside: () => {
      setShow(false);
    },
  });

  const handleChange = (...args) => {
    console.log(...args);
    setShow(false);
    onChange(...args);
  };

  const isValidReactElement =
    selectedValueLabel && React.isValidElement(selectedValueLabel);

  return (
    <div>
      {label && <div>{label}</div>}
      <div ref={targetRef} className="position-relative select-field">
        <Field
          name={name}
          rightAddon={
            <span
              style={{
                transition: "transform .1s linear",
                transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}`,
              }}
            >
              <DownIcon />
            </span>
          }
          readOnly
          value={isValidReactElement ? "" : selectedValueLabel}
          onClick={() => setShow(true)}
          placeholder={isValidReactElement ? "" : placeholder}
        />
        {isValidReactElement ? (
          <div
            style={{ pointerEvents: "none" }}
            className="position-absolute d-flex align-items-center px-2 top-0 left-0 w-100 h-100"
          >
            {selectedValueLabel}
          </div>
        ) : null}
        {show && (
          <DropDown
            items={list}
            name={name}
            onChange={handleChange}
            {...dropDownProps}
          />
        )}
      </div>
    </div>
  );
};

export default SelectField;
