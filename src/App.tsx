import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ExperiencePage from "./components/pages/ExperiencePage";
import EducationPage from "./components/pages/EducationPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import AwardsPage from "./components/pages/AwardsPage";
import ResearchPage from "./components/pages/ResearchPage";
import BlogPage from "./components/pages/BlogPage";
import LovePage from "./components/pages/LovePage";
import { useScrollToTop } from "./hooks/useScrollToTop";
import routes from "tempo-routes";

function App() {
  useScrollToTop();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/my/love" element={<LovePage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
