import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection";

const HomePage = () => {
  const [activePage, setActivePage] = useState("home");
  const [expanded, setExpanded] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="flex min-h-screen font-sans bg-stone-900 text-amber-100">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        expanded={expanded}
        setExpanded={setExpanded}
      />

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <ContentSection activePage={activePage} />
      </main>
    </div>
  );
};

export default HomePage;
