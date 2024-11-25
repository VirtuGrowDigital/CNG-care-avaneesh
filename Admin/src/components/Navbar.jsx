import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Admincontext } from "../contexts/admincontext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(Admincontext);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const links = [
    {
      image: "user",
      path: "/",
      text: "Users",
    },
    {
      image: "cart",
      path: "/products",
      text: "Products",
    },
    {
      image: "add",
      path: "/addproduct",
      text: "Add Product",
    },
    {
      image: "admin",
      path: "/admins",
      text: "Admins",
    },

    {
      image: "add",
      path: "/addadmins",
      text: "Insert Admin",
    },
    {
      image: "logout",
      onclick: handleLogout,
      text: "logout",
    },
  ];

  return (
    <nav
      style={{ background: "#FC370F" }}
      className="flex w-1/6 flex-col justify-start gap-6 items-center "
    >
      <div className="logo overflow-hidden">
        <NavLink to={"/"}>
          {<img src="/assets/logo.png" className="w-24 scale-150" />}
        </NavLink>
      </div>
      <hr className="bg-white w-full" />
      <div className="links w-full h-screen flex gap-4 flex-col items-center">
        <ul className="flex flex-col gap-6 text-white text-md">
          {links.map((link, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={link.path}
                  className="flex gap-2 items-center"
                  onClick={link.onclick}
                >
                  <img
                    src={`/assets/${link.image}.svg`}
                    className="w-6 cursor-pointer"
                  />
                  <p className=" hidden lg:block">{link.text}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
