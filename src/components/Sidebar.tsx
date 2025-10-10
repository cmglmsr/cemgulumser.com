import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, Book, Award, Trophy, FlaskConical, Menu, Github, Linkedin, ExternalLink, FileText } from "lucide-react";

const pages = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Experience", icon: <Briefcase size={20} />, path: "/experience" },
  { name: "Education", icon: <Book size={20} />, path: "/education" },
  { name: "Projects", icon: <Award size={20} />, path: "/projects" },
  { name: "Awards", icon: <Trophy size={20} />, path: "/awards" },
  { name: "Research", icon: <FlaskConical size={20} />, path: "/research" },
  { name: "Blog", icon: <FileText size={20} />, path: "/blog" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const isActivePage = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
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

      <nav className="flex flex-col gap-3 flex-1">
        {pages.map((page) => (
          <button
            key={page.path}
            onClick={() => navigate(page.path)}
            className={`flex items-center p-3 rounded-xl font-medium transition-all duration-500 ease-in-out cursor-pointer hover:bg-stone-800 ${
              expanded ? "gap-3" : "justify-center"
            } ${
              isActivePage(page.path) 
                ? "bg-stone-700 text-amber-100" 
                : "text-amber-200 hover:text-amber-100"
            }`}
          >
            {page.icon}
            {expanded && <span className="transition-all duration-500 ease-in-out whitespace-nowrap">{page.name}</span>}
          </button>
        ))}
      </nav>

      {/* Social Links */}
      <div className="mt-auto pt-4 border-t border-stone-700">
        <div className={`flex ${expanded ? "flex-col gap-2" : "flex-col gap-2"}`}>
          <a
            href="https://github.com/cmglmsr"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-3 rounded-xl font-medium transition-all duration-500 ease-in-out cursor-pointer hover:bg-stone-800 text-amber-200 hover:text-amber-100 ${
              expanded ? "gap-3" : "justify-center"
            }`}
          >
            <Github size={20} />
            {expanded && <span className="transition-all duration-500 ease-in-out whitespace-nowrap">GitHub</span>}
          </a>
          <a
            href="https://www.linkedin.com/in/cem-g%C3%BCl%C3%BCmser-2b685a213/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-3 rounded-xl font-medium transition-all duration-500 ease-in-out cursor-pointer hover:bg-stone-800 text-amber-200 hover:text-amber-100 ${
              expanded ? "gap-3" : "justify-center"
            }`}
          >
            <Linkedin size={20} />
            {expanded && <span className="transition-all duration-500 ease-in-out whitespace-nowrap">LinkedIn</span>}
          </a>
          <a
            href="https://www.npmjs.com/~cmglmsr"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-3 rounded-xl font-medium transition-all duration-500 ease-in-out cursor-pointer hover:bg-stone-800 text-amber-200 hover:text-amber-100 ${
              expanded ? "gap-3" : "justify-center"
            }`}
          >
            <ExternalLink size={20} />
            {expanded && <span className="transition-all duration-500 ease-in-out whitespace-nowrap">npm</span>}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;