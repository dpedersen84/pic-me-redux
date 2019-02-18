import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="btn-group mb4" role="group">
      <Link to="edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>
      {/* <Link to="edit-pics" className="btn btn-light">
        <i className="fas fa-images text-info mr-1" />
        Edit Pics
      </Link> */}
      <Link to="add-pic" className="btn btn-light">
        <i className="fas fa-images text-info mr-1" />
        Add Pic
      </Link>
    </div>
  );
};

export default DashboardActions;
