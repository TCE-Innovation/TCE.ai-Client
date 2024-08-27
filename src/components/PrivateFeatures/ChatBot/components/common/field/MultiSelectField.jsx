import React, { useEffect, useMemo, useState } from "react";
import { DownIcon } from "../../icons";
import { useOutsideClick } from "../../../hooks";
import Field from "./Field";
import { useFieldArray, useFieldValue } from "../../contexts/FormContext";
import DropDown from "./_DropDown";
import SelectedItems from "./_SelectedItems";

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

  return (
    <div>
      {label && <div>{label}</div>}
      <div ref={targetRef} className="position-relative select-field">
        <Field
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
          placeholder={placeholder}
          style={{ userSelect: "none" }}
        />
        <SelectedItems
          list={list}
          name={name}
          value={value}
          handleRemove={remove}
        />
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
