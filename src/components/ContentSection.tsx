import React from "react";
import { motion } from "framer-motion";

interface ContentSectionProps {
  activePage: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  activePage = "home",
}) => {
  const renderListPage = (title: string) => (
    <motion.div
      className="p-0 max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-stone-800 text-amber-100 w-full">
        <h1 className="text-4xl font-bold mb-16 text-center capitalize">
          {title}
        </h1>
        <div className="space-y-16 w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full"
            >
              <img
                src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80&text=${title}+${i}`}
                alt={`${title} ${i}`}
                className="w-52 h-52 rounded-lg object-cover shadow-md"
              />
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-xl">[Title {i}]</h2>
                <p className="text-base">
                  [Description of {title} entry {i}]
                </p>
                <p className="text-sm text-amber-200">
                  [Begin Date - End Date]
                </p>
                <p className="text-sm">Skills: [Placeholder]</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );

  const renderHomePage = () => (
    <motion.div
      className="p-0 max-w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 bg-gradient-to-br from-stone-700 to-stone-900 text-amber-100">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
          alt="Profile"
          className="w-72 h-auto rounded-xl shadow-2xl border-4 border-stone-600 object-cover"
        />
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4">Mustafa Cem Gülümser</h1>
          <p className="text-xl mb-4">
            Computer Scientist specialized in Cybersecurity
          </p>
          <p className="text-lg text-amber-200">
            [Placeholder for a short bio about you]
          </p>
        </div>
      </section>

      {/* Facts Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-stone-800 text-amber-100 w-full">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Some Facts About Me
        </h2>
        <div className="space-y-16 w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full"
            >
              <img
                src={`https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&q=80&text=Fact+${i}`}
                alt={`Fact ${i}`}
                className="w-52 h-52 rounded-lg object-cover shadow-md"
              />
              <p className="text-lg">[Description of fact {i}]</p>
            </div>
          ))}
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 px-6 bg-stone-900 text-center text-amber-100">
        <h2 className="text-2xl font-semibold mb-6">Find Me Online</h2>
        <div className="flex justify-center gap-10 font-medium">
          <a href="#" className="hover:underline cursor-pointer">
            GitHub
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            LinkedIn
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            npm
          </a>
        </div>
      </section>
    </motion.div>
  );

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return renderHomePage();
      case "experience":
        return renderListPage("Experience");
      case "education":
        return renderListPage("Education");
      case "projects":
        return renderListPage("Projects & Awards");
      case "research":
        return renderListPage("Research");
      default:
        return renderHomePage();
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-stone-900">
      {renderContent()}
    </main>
  );
};

export default ContentSection;
