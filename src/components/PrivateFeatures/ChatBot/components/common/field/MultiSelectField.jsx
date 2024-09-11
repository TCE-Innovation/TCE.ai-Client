import React, { useEffect, useMemo, useState } from "react";
import { DownIcon } from "../../icons";
import { useOutsideClick } from "../../../hooks";
import Field from "./Field";
import ErrorBlock from "./ErrorBlock";
import { useFieldValue } from "../../contexts/FormContext";
import DropDown from "./_DropDown";

const MultiSelectField = ({
  name,
  label = "",
  placeholder,
  extractor,
  items,
  filterOnSelect = false,
  onChange = () => {},
  values,
  handleRemove,
  ...dropDownProps
}) => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  const { changeValue } = useFieldValue(name);

  useEffect(() => {
    changeValue(values);
    // eslint-disable-next-line
  }, [values]);

  const activeList = useMemo(() => {
    return list.filter((item) => values.every((v) => v !== item.value));
  }, [values, list]);

  useEffect(() => {
    setList(items.map((item, i) => ({ ...item, ...extractor(item, i) })));
    // eslint-disable-next-line
  }, [items]);

  const { targetRef } = useOutsideClick({
    onClickOutside: () => {
      setShow(false);
    },
  });

  const handleChange = (...args) => {
    setShow(false);
    onChange(...args);
  };

  const selectedItems = useMemo(() => {
    return list.filter((item) =>
      values?.some((valueItem) => valueItem === item.value)
    );
  }, [list, values]);

  return (
    <div>
      {label && <div>{label}</div>}
      <ErrorBlock name={name} />
      <div ref={targetRef} className="position-relative select-field">
        <Field
          showError={false}
          name={name}
          rightAddon={
            <div
              style={{
                transition: "transform .1s linear",
                transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}`,
                pointerEvents: "none",
              }}
            >
              <DownIcon />
            </div>
          }
          readOnly
          value={""}
          onClick={() => setShow((prev) => !prev)}
          placeholder={selectedItems.length ? "" : placeholder}
          style={{ userSelect: "none" }}
        />
        {selectedItems.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "calc(100% - 50px)",
              padding: ".5em",
              height: "100%",
              display: "flex",
              gap: ".5em",
              alignItems: "center",
              overflow: "hidden",
              overflowX: "auto",
              pointerEvents: "none",
            }}
          >
            {selectedItems.map((item) => {
              return (
                <div
                  key={item.value}
                  style={{
                    backgroundColor: "var(--chatbot-light-grey)",
                    padding: ".25em",
                    height: "max-content",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: "70px",
                    borderRadius: ".25em",
                    overflow: "hidden",
                    cursor: "pointer",
                    color: "var(--chatbot-text-primary)",
                    fontWeight: "initial",
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
        {show && (
          <DropDown
            items={filterOnSelect ? activeList : list}
            name={name}
            onChange={handleChange}
            {...dropDownProps}
          />
        )}
      </div>
    </div>
  );
};

export default MultiSelectField;
