import React from "react";

import Wrapper from "./style";

const AdminLayout = ({ children }) => {
  const [admin] = React.Children.toArray(children);
  return <Wrapper>{admin}</Wrapper>;
};

export default AdminLayout;
