import React, { useEffect, useMemo, useState } from "react";
import Field from "./Field";
import ErrorBlock from "./ErrorBlock";

import { DownIcon } from "../../icons";
import { useOutsideClick } from "../../../hooks";
import { useFieldValue } from "../../contexts/FormContext";

import DropDown from "./_DropDown";

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
    // eslint-disable-next-line
  }, [value, list]);

  useEffect(() => {
    setList(items.map((item, i) => extractor(item, i)));
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

  const isValidReactElement =
    selectedValueLabel && React.isValidElement(selectedValueLabel);

  return (
    <div>
      {label && <div>{label}</div>}
      <ErrorBlock name={name} />
      <div ref={targetRef} className="position-relative select-field">
        <Field
          name={name}
          showError={false}
          rightAddon={
            <span
              style={{
                transition: "transform .1s linear",
                transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}`,
                pointerEvents: "none",
              }}
            >
              <DownIcon />
            </span>
          }
          readOnly
          value={isValidReactElement ? "" : selectedValueLabel}
          onClick={() => setShow((prev) => !prev)}
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
