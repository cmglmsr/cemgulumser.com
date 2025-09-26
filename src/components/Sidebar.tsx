import React, { useState } from "react";
import { Home, Briefcase, Book, Award, FlaskConical, Menu } from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
}

const pages = [
  { name: "Home", icon: <Home size={20} />, id: "home" },
  { name: "Experience", icon: <Briefcase size={20} />, id: "experience" },
  { name: "Education", icon: <Book size={20} />, id: "education" },
  { name: "Projects & Awards", icon: <Award size={20} />, id: "projects" },
  { name: "Research", icon: <FlaskConical size={20} />, id: "research" },
];

const Sidebar = ({
  activePage = "home",
  setActivePage = () => {},
  expanded = true,
  setExpanded = () => {},
}: SidebarProps) => {
  return (
    <div
      className={`bg-stone-900 p-4 transition-all duration-500 ease-in-out shadow-xl ${expanded ? "w-64" : "w-20"} flex flex-col h-screen sticky top-0`}
    >
      <button
        className={`mb-8 flex items-center p-2 rounded-xl hover:bg-stone-800 transition-all duration-500 ease-in-out cursor-pointer ${expanded ? "gap-2" : "justify-center"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <Menu size={20} className="text-amber-100" />
        {expanded && <span className="font-bold text-amber-100 transition-all duration-500 ease-in-out">Menu</span>}
      </button>

      <nav className="flex flex-col gap-3">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`flex items-center p-3 rounded-xl font-medium transition-all duration-500 ease-in-out cursor-pointer hover:bg-stone-800 ${
              expanded ? "gap-3" : "justify-center"
            } ${
              activePage === page.id 
                ? "bg-stone-700 text-amber-100" 
                : "text-amber-200 hover:text-amber-100"
            }`}
          >
            {page.icon}
            {expanded && <span className="transition-all duration-500 ease-in-out whitespace-nowrap">{page.name}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;