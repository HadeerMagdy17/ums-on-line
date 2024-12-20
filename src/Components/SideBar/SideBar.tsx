import  { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaUsers,
} from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";
export default function SideBar() {
   let {userData}:any=useContext(AuthContext)
  let [collapsed, setIsCollapsed] = useState(false);
  let navigate=useNavigate()

  let toggleCollapse = () => {
    setIsCollapsed(!collapsed);
  };
  let logout=()=>{
    localStorage.removeItem("userToken")
    navigate("/login")

  }

  return (
    <div className="sidebarContainer vh-100">
      <Sidebar collapsed={collapsed} className="vh-100">
        {collapsed ? (
          <FaArrowAltCircleRight
            onClick={toggleCollapse}
            className="mx-2"
            size={25}
          />
        ) : (
          <FaArrowAltCircleLeft
            onClick={toggleCollapse}
            className="mx-2"
            size={25}
          />
        )}

        <div className="text-center my-4">
          <img src={userData?.image} className="rounded-circle w-75" alt="profile" />
          <h6 className="my-3">{userData?.firstName} {userData?.lastName}</h6>
          <h6 className="text-warning">Admin</h6>
        </div>
        <Menu>
          <MenuItem icon={<IoHome />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsers />}
            component={<Link to="/dashboard/users-list" />}
          >
            {" "}
            Users
          </MenuItem>
          <MenuItem
            icon={<IoIosPersonAdd />}
            component={<Link to="/dashboard/add-user" />}
          >
            {" "}
            Add user
          </MenuItem>
          <MenuItem
            icon={<CgProfile />}
            component={<Link to="/dashboard/profile" />}
          >
            {" "}
            Profile
          </MenuItem>
          <MenuItem icon={<RiLogoutBoxLine />} onClick={logout}>
            {" "}
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
