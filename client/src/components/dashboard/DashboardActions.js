import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="btn-group mb4" role="group">
      <Link to="edit-profile" className="btn btn-warning">
        <i className="fas fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>
      <Link to="edit-pics" className="btn btn-warning">
        <i className="fas fa-images text-info mr-1" />
        Edit Pics
      </Link>
    </div>
  );
};

export default DashboardActions;
