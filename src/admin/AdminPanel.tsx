import React from "react";
import ListingsManagement from "./ListingsManagement";
import BookingsManagement from "./BookingsManagement";
import { useUser } from "../context/UserContext";

const AdminPanel: React.FC = () => {
  const { user } = useUser();

  if (!user || !user.isAdmin) {
    return (
      <div className="text-center text-red-500 font-bold mt-10">
        Access Denied
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <h1 className="text-center text-3xl font-bold my-6">Admin Panel</h1>
      <div className="space-y-8">
        <ListingsManagement />
        <BookingsManagement />
      </div>
    </div>
  );
};

export default AdminPanel;
