import React, { useEffect, useMemo, useState } from "react";
import Field from "./Field";
import ErrorBlock from "./ErrorBlock";
import { DownIcon, SearchIcon } from "../../icons";
import DropDown from "./_DropDown";
import SelectedItems from "./_SelectedItems";
import FormContext, {
  useFieldArray,
  useFieldValue,
} from "../../contexts/FormContext";
import { useOutsideClick } from "../../../hooks";
import { filterByPatternsFactory } from "../../../utils/form";

const SearchFieldContext = ({ children }) => {
  return (
    <FormContext
      initialValues={{
        search: "",
      }}
    >
      {children}
    </FormContext>
  );
};

const SearchField = ({
  searchItems,
  name,
  extractor,
  placeholder,
  onChange,
  ...dropDownProps
}) => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  const { value, push, remove } = useFieldArray(name);
  const { changeValue } = useFieldValue(name);

  const { targetRef } = useOutsideClick({
    onClickOutside: () => {
      setShow(false);
    },
  });

  useEffect(() => {
    changeValue(value);
    // eslint-disable-next-line
  }, [value]);

  const handleChange = (...args) => {
    setShow(false);
    push(...args);
    onChange?.(...args);
  };

  useEffect(() => {
    setList(searchItems.map((item, i) => ({ ...item, ...extractor(item, i) })));
    // eslint-disable-next-line
  }, [searchItems]);

  const activeList = useMemo(() => {
    return list.filter((item) => value.every((v) => v !== item.value));
  }, [value, list]);

  return (
    <>
      <ErrorBlock name={name} />
      <SearchFieldContext>
        <div ref={targetRef} className="position-relative">
          <Field
            name={"search"}
            autoComplete="off"
            placeholder={placeholder}
            onClick={() => setShow((prev) => !prev)}
            showError={false}
            leftAddon={<SearchIcon />}
            rightAddon={
              <div
                style={{
                  transition: "transform .1s linear",
                  transform: `${show ? "rotate(180deg)" : "rotate(0deg)"}`,
                }}
              >
                <DownIcon />
              </div>
            }
          />
          {show && (
            <DropDownComponent
              items={activeList}
              onChange={handleChange}
              {...dropDownProps}
            />
          )}
        </div>
        <SelectedItems list={list} handleRemove={remove} value={value} />
      </SearchFieldContext>
    </>
  );
};

const DropDownComponent = ({ items, onChange, ...dropDownProps }) => {
  const { changeValue, value: search } = useFieldValue("search");

  const handleChange = (item) => {
    onChange?.(item);
    changeValue("");
  };

  const matchedItems = useMemo(() => {
    const filterByLabel = filterByPatternsFactory(search, "label");
    return filterByLabel(items);
  }, [search, items]);

  return (
    <>
      <DropDown
        items={matchedItems}
        name="search"
        onChange={handleChange}
        {...dropDownProps}
      />
    </>
  );
};

export default SearchField;
