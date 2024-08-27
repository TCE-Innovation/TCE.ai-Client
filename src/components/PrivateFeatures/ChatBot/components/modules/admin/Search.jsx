import React from "react";

import { SearchIcon } from "../../icons";
import { Field } from "../../common";
import { useFieldValue } from "../../contexts/FormContext";

const Search = ({ placeholder, onChange, name = "search" }) => {
  const { value } = useFieldValue(name);
  return (
    <>
      <Field
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        leftAddon={<SearchIcon />}
        autoComplete="off"
        className="my-2"
        value={value}
        showError={false}
      />
    </>
  );
};

export default Search;
