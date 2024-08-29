import React from "react";
import { AdminLayout } from "../../layouts";

import { AdminModule } from "../../modules";

import AdminContext from "../../contexts/Admin";

const Admin = () => {
  return (
    <AdminLayout>
      <AdminContext>
        <AdminModule />
      </AdminContext>
    </AdminLayout>
  );
};

export default Admin;
