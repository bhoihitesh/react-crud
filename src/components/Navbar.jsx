import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <style>
        {`
        .menu-btn-container{
          transition: transform 0.3s ease-in-out;
        }
        .close-icon{
        transform: rotate(180deg);
      }`}
      </style>
      <div className="navbar-container flex items-center justify-between bg-slate-100 p-2 shadow-md">
        <div className="navbar-logo text-3xl font-semibold text-orange-600">
          Logo
        </div>
        <div className="navbar-menu hidden md:block">
          <ul className="flex items-center gap-2 pe-2">
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
             <Link to='/'>Home</Link>
            </li>
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
              <Link to={`view/`}>View</Link>
            </li>
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
              <Link to={`edit/`}>Edit</Link>
            </li>
          </ul>
        </div>
        <div
          className={`menu-btn-container block md:hidden ${toggle ? "close-icon" : ""}`}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <AiOutlineMenu className="menu-icon text-3xl" />
          ) : (
            <AiOutlineClose className="close-menu-icon text-3xl" />
          )}
        </div>
        <div
          className={`sidebar-container ${!toggle ? "fixed left-0 top-0 h-full w-[50%] bg-slate-200 transition-all duration-500 ease-in-out" : "fixed left-[-100%]"}`}
        >
          <div className="sidebar-logo navbar-logo text-center text-3xl font-semibold text-orange-600">
            Logo
          </div>
          <ul className={`sidebar-menu mt-5 text-center`}>
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
            <Link to='/'>Home</Link>
            </li>
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
              View
            </li>
            <li className="text-md cursor-pointer rounded-md px-2 py-1 font-semibold hover:bg-orange-500 hover:text-white">
              Edit
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
