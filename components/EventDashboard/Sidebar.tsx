"use client";
import { FC, useState } from "react";
import { Menu } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  setView: (view: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState("list");
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu

  const handleTabClick = (view: string) => {
    setActiveTab(view);
    setView(view);
    setMobileOpen(false); 
  };

  return (
    <>
      {!mobileOpen && (
        <div className="md:hidden fixed top-4 left-4 z-[2000] bg-indigo-900 p-2 rounded-lg shadow-lg">
          <IconButton onClick={() => setMobileOpen(true)}>
            <Menu className="text-white" fontSize="medium" />
          </IconButton>
        </div>
      )}

      <div className="hidden md:flex w-64 min-h-screen bg-indigo-900 text-white p-6 shadow-lg flex-col justify-between">
        <SidebarContent activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="w-64 min-h-screen bg-indigo-900 text-white p-6 flex flex-col justify-between">
          <SidebarContent activeTab={activeTab} handleTabClick={handleTabClick} />
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
