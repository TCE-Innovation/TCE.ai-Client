import React from "react";
import { AdminLayout } from "../../layouts";

import { AdminModule } from "../../modules";

import AdminContext from "../../contexts/Admin";
// import CacheContext from "../../contexts/Cache";

const index = () => {
  return (
    <AdminLayout>
      {/* <CacheContext> */}
      <AdminContext>
        <AdminModule />
      </AdminContext>
      {/* </CacheContext> */}
    </AdminLayout>
  );
};

export default index;
