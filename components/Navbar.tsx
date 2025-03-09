"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "./Icon";
import LinkData from "@/constant/Link.data.js";

function Navbar() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ensure we only update state on the client side
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  // Avoid rendering anything until the path is set (prevents hydration mismatch)
  if (currentPath === null) return null;

  return (
    <AppBar position="sticky" className="bg-indigo-900 shadow-md">
      <Toolbar className="flex justify-between items-center px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Icon />
          <Typography variant="h6" className="text-white">
            Event Register
          </Typography>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6">
          {LinkData.map((linkObj) => {
            const isActive = currentPath === linkObj.path;
            return (
              <Link key={linkObj.id} href={linkObj.path} passHref>
                <Button
                  variant="text"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    borderBottom: isActive ? "2px solid white" : "none",
                    fontWeight: isActive ? "bold" : "normal",
                    opacity: isActive ? 1 : 0.8,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  {linkObj.title}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <IconButton onClick={() => setMobileOpen(true)}>
            <MenuIcon fontSize="large" className="text-white" />
          </IconButton>
        </div>
      </Toolbar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List className="w-64 bg-indigo-900 text-white h-full">
          {LinkData.map((linkObj) => (
            <ListItem key={linkObj.id} disablePadding>
              <ListItemButton
                component={Link}
                href={linkObj.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  color: "white",
                  borderBottom: currentPath === linkObj.path ? "2px solid white" : "none",
                }}
              >
                <ListItemText primary={linkObj.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
