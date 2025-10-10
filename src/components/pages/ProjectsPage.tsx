import React from "react";
import Sidebar from "../Sidebar";
import ContentSection from "../ContentSection";

const ProjectsPage = () => {
  return (
    <div className="flex min-h-screen font-sans bg-stone-900 text-amber-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <ContentSection activePage="projects" />
      </main>
    </div>
  );
};

export default ProjectsPage;


