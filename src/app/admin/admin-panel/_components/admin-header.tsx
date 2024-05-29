"use client";

import { Logo } from "@/components/ui/logo";
import { FC } from "react";
import { AdminNavbar } from "./admin-navbar";

export const AdminHeader: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo href="/admin/admin-panel/applications" />

      <AdminNavbar />
    </div>
  );
};
