"use client"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import LinkData from "@/constant/Link.data.js";

function Navbar() {
  const pathname = usePathname(); 

  return (
    <div className="p-2 flex justify-evenly items-center bg-slate-500">
      <div className="flex items-center gap-2">
        <Icon />
        <h1 className="text-indigo-700 text-2xl">Event Register</h1>
      </div>

      <div className="flex gap-4">
        {LinkData.map((linkObj) => {
          const isActive = pathname === linkObj.path;
          return (
            <Link
              key={linkObj.id}
              href={linkObj.path}
              className={`text-lg transition-colors mx-3 ${
                isActive ? "text-indigo-900 font-bold border-b-2 border-indigo-900" : "text-indigo-700 hover:text-indigo-900"
              }`}
            >
              {linkObj.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
