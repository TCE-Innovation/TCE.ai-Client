import React from "react";

import { SearchIcon } from "../../icons";
import { Field } from "../../common";

const Search = ({ placeholder, onChange, name = "search" }) => {
  return (
    <>
      <Field
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        leftAddon={<SearchIcon />}
        autoComplete="off"
        className="my-2"
      />
    </>
  );
};

export default Search;
