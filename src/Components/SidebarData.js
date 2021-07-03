import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LockIcon from "@material-ui/icons/Lock";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Library",
    path: "/library",
    icon: <LocalLibraryIcon />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/signin",
    icon: <LockIcon />,
    cName: "nav-text",
  },
];
