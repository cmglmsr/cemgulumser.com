import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ContentSectionProps {
  activePage: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  activePage = "home",
}) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
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
                src={`/images/${title.toLowerCase().replace(' & ', '-').replace(' ', '-')}/${i}.jpg`}
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
          src="/images/profile/profile.jpg"
          alt="Profile"
          className="w-72 h-auto rounded-xl shadow-2xl border-4 border-stone-600 object-cover"
        />
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4">Mustafa Cem Gülümser</h1>
          <p className="text-xl mb-4">
            Computer Scientist specialized in Cybersecurity
          </p>
          <p className="text-lg text-amber-200">
            My name is Mustafa Cem Gülümser. I am a Bilkent University Computer Science graduate and have a MSc in Software and Systems Security from University of Oxford. I have 3+ years of experience in security software development and cybersecurity research.
          </p>
        </div>
      </section>

      {/* Facts Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 bg-stone-800 text-amber-100 w-full">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          Some Facts About Me
        </motion.h2>
        <motion.div 
          className="space-y-16 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <img
                src={`/images/facts/fact-${i}.jpg`}
                alt={`Fact ${i}`}
                className="w-52 h-52 rounded-lg object-cover shadow-md"
              />
              <p className="text-lg">[Description of fact {i}]</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Links Section */}
      <section className="py-16 px-6 bg-stone-900 text-center text-amber-100">
        <motion.h2 
          className="text-2xl font-semibold mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          Find Me Online
        </motion.h2>
        <motion.div 
          className="flex justify-center gap-10 font-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#" className="hover:underline cursor-pointer">
            GitHub
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            LinkedIn
          </a>
          <a href="#" className="hover:underline cursor-pointer">
            npm
          </a>
        </motion.div>
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
