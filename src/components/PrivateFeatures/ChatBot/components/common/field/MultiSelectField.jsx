import React, { useEffect, useMemo, useState } from "react";
import { DownIcon, CloseIcon } from "../../icons";
import { useOutsideClick } from "../../../hooks";
import Field from "./Field";
import { useFieldArray, useFieldValue } from "../../contexts/FormContext";
import DropDown from "./_DropDown";

const MultiSelectField = ({
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

  const { value, push, remove } = useFieldArray(name);
  const { changeValue } = useFieldValue(name);

  useEffect(() => {
    changeValue(value);
    // eslint-disable-next-line
  }, [value]);

  const selectedValueLabel = useMemo(() => {
    const { listRenderer } = dropDownProps;
    return (
      <>
        {list
          .filter((item) => value.some((valueItem) => valueItem === item.value))
          .map((item) => {
            return (
              <button
                type="button"
                key={item.value}
                className="chat-button d-flex align-items-center gap-2 p-2 my-2 rounded mx-2"
                style={{
                  width: "max-content",
                  fontSize: ".75em",
                  border: "1px solid",
                  cursor: "pointer",
                  pointerEvents: "all",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{listRenderer?.(item) || item.label}</span>
                <span onClick={() => remove(item.value)}>
                  <CloseIcon width={".75em"} />
                </span>
              </button>
            );
          })}
      </>
    );
    // eslint-disable-next-line
  }, [value, list]);

  const activeList = useMemo(() => {
    return list.filter((item) => value.every((v) => v !== item.value));
  }, [value, list]);

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
    push(...args);
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
          value={""}
          onClick={() => setShow((prev) => !prev)}
          placeholder={placeholder}
          style={{ userSelect: "none" }}
        />
        {isValidReactElement ? (
          <div
            style={{
              flexWrap: "wrap",
              border: value.length ? "1px solid" : "",
              borderRadius: ".25em",
              maxHeight: "100px",
              overflow: "hidden",
              overflowY: "auto",
            }}
            className="d-flex align-items-center top-0 w-100"
          >
            {selectedValueLabel}
          </div>
        ) : null}
        {show && (
          <DropDown
            items={activeList}
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
