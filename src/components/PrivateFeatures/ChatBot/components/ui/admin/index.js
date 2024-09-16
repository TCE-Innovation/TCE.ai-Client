import React from "react";
import { AdminLayout } from "../../layouts";

import { AdminModule } from "../../modules";

import AdminContext from "../../contexts/Admin";

import AdminGuard from "../../auth/Admin";

const Admin = () => {
  return (
    <AdminGuard>
      <AdminLayout>
        <AdminContext>
          <AdminModule />
        </AdminContext>
      </AdminLayout>
    </AdminGuard>
  );
};

export default Admin;
