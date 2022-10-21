import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between p-3">
        <Link to="/">Home</Link>
        <Link className="btn btn-primary" to="/add">Add</Link>
      </div>
      <Outlet />
    </>
  )
}

export default Layout;