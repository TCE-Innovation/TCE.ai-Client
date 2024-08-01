import React from "react";

import { SearchIcon } from "../../icons";
import { Field } from "../../common";
import FormContext from "../../contexts/FormContext";

const Search = ({ placeholder, onChange }) => {
  return (
    <FormContext initialValues={{ search: "" }}>
      <Field
        name={"search"}
        placeholder={placeholder}
        onChange={onChange}
        leftAddon={<SearchIcon />}
        autoComplete="off"
        className="my-2"
      />
    </FormContext>
  );
};

export default Search;
