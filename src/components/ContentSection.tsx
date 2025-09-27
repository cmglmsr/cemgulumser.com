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
          {title === "Experience" ? (
            <>
              {/* Senior Security Engineer - Garanti BBVA */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/experience/1.jpg"
                  alt="Garanti BBVA"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Senior Security Engineer</h2>
                  <p className="text-lg font-medium text-amber-300">Garanti BBVA</p>
                  <p className="text-base">
                    Part of an agile team ensuring the security of cloud infrastructure at Garanti BBVA, one of Europe's largest banks. 
                    Utilize OpenShift for container orchestration and Prisma Cloud for cloud security posture management, focusing on 
                    compliance, threat detection, and vulnerability mitigation across hybrid environments.
                  </p>
                  <p className="text-sm text-amber-200">June 2025 – Current</p>
                  <p className="text-sm">Skills: OpenShift, Prisma Cloud, Cloud Security, Compliance, Threat Detection, Vulnerability Management</p>
                </div>
              </div>

              {/* Security Software Engineer - TR7 Cyber Security */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/experience/2.jpg"
                  alt="TR7 Cyber Security"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Security Software Engineer</h2>
                  <p className="text-lg font-medium text-amber-300">TR7 Cyber Security</p>
                  <p className="text-base">
                    Contributed to the development of TR7 ASP, an integrated application security platform featuring WAF, load 
                    balancing, and IAM capabilities. Worked across the full stack using Python, JavaScript (FastAPI, Node.js, Vue.js), and 
                    AWS services, while managing microservices with Docker and Kubernetes. Developed kernel-level networking 
                    components, implemented Redis for distributed caching, and led compliance efforts for EAL4+ and ISO 27001.
                  </p>
                  <p className="text-sm text-amber-200">October 2022 – May 2025</p>
                  <p className="text-sm">Skills: Python, JavaScript, FastAPI, Node.js, Vue.js, AWS, Docker, Kubernetes, Redis, EAL4+, ISO 27001</p>
                </div>
              </div>

              {/* CS115 Tutor - Bilkent University */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/experience/3.jpg"
                  alt="Bilkent University"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">CS115 Tutor</h2>
                  <p className="text-lg font-medium text-amber-300">Bilkent University</p>
                  <p className="text-base">
                    Tutored students in Python programming, providing guidance on data structures, algorithms, and data analysis. 
                    Assisted with lab assignments, fostering problem-solving skills and a deeper understanding of core programming concepts.
                  </p>
                  <p className="text-sm text-amber-200">September 2022 – January 2023</p>
                  <p className="text-sm">Skills: Python, Data Structures, Algorithms, Data Analysis, Teaching, Mentoring</p>
                </div>
              </div>

              {/* Networking & Security Intern - SunExpress Airlines */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/experience/4.jpg"
                  alt="SunExpress Airlines"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Networking & Security Intern</h2>
                  <p className="text-lg font-medium text-amber-300">SunExpress Airlines</p>
                  <p className="text-base">
                    Developed Python scripts for network automation and web penetration testing, enhancing security and efficiency. 
                    Gained extensive experience with Microsoft Azure, BurpSuite, Linux, and VMware, leveraging these tools for cloud 
                    management, security assessments, and virtualization.
                  </p>
                  <p className="text-sm text-amber-200">June 2022 – July 2022</p>
                  <p className="text-sm">Skills: Python, Network Automation, Penetration Testing, Azure, BurpSuite, Linux, VMware</p>
                </div>
              </div>
            </>
          ) : title === "Education" ? (
            <>
              {/* MSc in Software and Systems Security - University of Oxford */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/education/1.jpg"
                  alt="University of Oxford"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">MSc in Software and Systems Security</h2>
                  <p className="text-lg font-medium text-amber-300">University of Oxford</p>
                  <p className="text-base">
                    Part-time master's degree at University of Oxford, focusing on advanced software security, systems security, 
                    and cybersecurity research. Located in Oxford, United Kingdom.
                  </p>
                  <p className="text-sm text-amber-200">2024 – Current</p>
                  <p className="text-sm">Location: Oxford, United Kingdom | Type: Part-time</p>
                </div>
              </div>

              {/* BSc in Computer Science - Bilkent University */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/education/2.jpg"
                  alt="Bilkent University"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">BSc in Computer Science</h2>
                  <p className="text-lg font-medium text-amber-300">Bilkent University</p>
                  <p className="text-base">
                    Bachelor's degree in Computer Science/Engineering from Bilkent University. Achieved a final grade of 3.71 
                    with 80% Merit Scholarship and High Honor Student status. Located in Ankara, Türkiye.
                  </p>
                  <p className="text-sm text-amber-200">2020 – 2024</p>
                  <p className="text-sm">Location: Ankara, Türkiye | Grade: 3.71 | 80% Merit Scholarship, High Honor Student</p>
                </div>
              </div>
            </>
          ) : title === "Projects" ? (
            <>
              {/* RouterGuard */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/projects/1.jpg"
                  alt="RouterGuard"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">RouterGuard</h2>
                  <p className="text-base">
                    I independently designed and implemented this open-source project RT Guard. This is a security middleware for
                    Express.js applications. It is designed to audit incoming HTTP requests for potential malicious payloads based on
                    predefined patterns. This middleware provides configurable options to define security levels, allowed request
                    methods, and allowed content types.
                  </p>
                  <p className="text-sm text-amber-200">August 28, 2024 – September 10, 2024</p>
                  <p className="text-sm">Open Source | Express.js | Security Middleware | <a href="https://www.npmjs.com/package/rtguard" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">npm Package</a></p>
                </div>
              </div>

              {/* TR7 Portal */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/projects/2.jpg"
                  alt="TR7 Portal"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">TR7 Portal</h2>
                  <p className="text-base">
                    I designed and implemented this full-stack application, TR7 Portal. It is a comprehensive web application that enables
                    users to manage their licenses, view connected hardware and virtual appliances, check for updates, create support
                    tickets, request assistance, and communicate directly with the TR7 support team. TR7 Portal serves as a distributed
                    platform, facilitating secure communication with TR7 appliances over the internet.
                  </p>
                  <p className="text-sm text-amber-200">October 20, 2023 – January 28, 2025</p>
                  <p className="text-sm">Full-Stack | Web Application | License Management | Support System | Distributed Platform</p>
                </div>
              </div>

              {/* Impartial News */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/projects/3.jpg"
                  alt="Impartial News"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Impartial News - A News Platform Powered with Generative AI</h2>
                  <p className="text-base">
                    I led a team in designing a platform to classify news articles based on political bias and present them from various
                    political perspectives using Large Language Models (LLMs). I was responsible for the deployment and hosting of the
                    project on AWS, utilizing services such as EC2, Route 53, Lambda, and API Gateway. Our project received the
                    Demonstration Award at Bilkent University CS Fair 2024.
                  </p>
                  <p className="text-sm text-amber-200">September 15, 2023 – May 1, 2024</p>
                  <p className="text-sm">Team Lead | AWS | LLMs | Demonstration Award Winner | Bilkent University CS Fair 2024</p>
                </div>
              </div>

            </>
          ) : title === "Research" ? (
            <>
              {/* Anomaly Detection in Industrial Control Systems */}
              <div className="flex flex-col gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Anomaly Detection in Industrial Control Systems with Bayes Networks</h2>
                  <p className="text-base">
                    I am collaborating with a member of the Oxford University Computer Science Department on research focused on
                    detecting anomalous and malicious behavior within industrial control systems (ICS). My specific area of research
                    involves developing a method using Bayesian Networks to model and identify anomalies.
                  </p>
                  <p className="text-sm text-amber-200">December 10, 2024 – Current</p>
                  <p className="text-sm">Research | Oxford University | Bayesian Networks | Industrial Control Systems | Anomaly Detection | <span className="text-amber-300">Paper in progress</span></p>
                </div>
              </div>

              {/* Detection of Face Morph Attacks */}
              <div className="flex flex-col gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Detection of Face Morph Attacks on Facial ID Verification Systems</h2>
                  <p className="text-base">
                    I authored a research paper on the security of automated facial ID verification systems, independently conducting all
                    aspects of the research and composing the entire paper. As part of the study, I designed a proof-of-concept (PoC) facial
                    ID verification system using GoogleNet as a test environment. I benchmarked several face morphing attack algorithms
                    and proposed targeted security measures to mitigate each type of attack.
                  </p>
                  <p className="text-sm text-amber-200">October 7, 2022 – May 30, 2023</p>
                  <p className="text-sm">Research Paper | Computer Vision | Security | GoogleNet | <a href="/downloads/face-morph-attacks-research.pdf" className="text-blue-400 hover:underline inline-flex items-center gap-1" download>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a></p>
                </div>
              </div>
            </>
          ) : title === "Awards" ? (
            <>
              {/* Kubernetes and Cloud Native Associate Certification */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/awards/1.jpg"
                  alt="Kubernetes Certification"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Kubernetes and Cloud Native Associate Certification</h2>
                  <p className="text-base">
                    Professional certification demonstrating expertise in Kubernetes container orchestration and cloud-native technologies. 
                    This certification validates skills in deploying, managing, and scaling containerized applications using Kubernetes 
                    and related cloud-native tools and practices.
                  </p>
                  <p className="text-sm text-amber-200">2025</p>
                  <p className="text-sm">Cloud Native Computing Foundation (CNCF)</p>
                </div>
              </div>

              {/* Microsoft Azure Network Engineer Associate Certification */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full">
                <img
                  src="/images/awards/2.jpg"
                  alt="Azure Network Engineer Certification"
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl">Microsoft Azure Network Engineer Associate Certification</h2>
                  <p className="text-base">
                    Microsoft Azure certification validating expertise in designing, implementing, and managing Azure networking solutions. 
                    This certification demonstrates proficiency in Azure virtual networks, hybrid connectivity, security, and network monitoring, 
                    essential for modern cloud infrastructure management.
                  </p>
                  <p className="text-sm text-amber-200">2022</p>
                  <p className="text-sm">Microsoft</p>
                </div>
              </div>

            </>
          ) : (
            [1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-8 bg-stone-700 rounded-2xl p-8 shadow-xl w-full"
            >
              <img
                src={`/images/${title.toLowerCase().replace(' & ', '-').replace(' ', '-')}/${i}.jpg`}
                alt={`${title} ${i}`}
                  className="w-72 h-72 rounded-lg object-cover shadow-md"
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
            ))
          )}
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
          className="w-80 h-auto rounded-xl shadow-2xl border-4 border-stone-600 object-cover"
        />
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4">Mustafa Cem Gülümser</h1>
          <p className="text-xl mb-4">
            Computer Scientist specialized in Cybersecurity
          </p>
          <p className="text-lg text-amber-200">
            My name is Mustafa Cem Gülümser. I am a Bilkent University Computer Science graduate and have a MSc in Software and Systems Security from University of Oxford. 
            I have 3+ years of experience in security software development and cybersecurity research.
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
                className="w-72 h-72 rounded-lg object-cover shadow-md"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-xl">Fact {i}</h3>
                <p className="text-lg">
                  {i === 1 && "I have been playing basketball for over 10 years and absolutely love watching NBA and Euroleague games. Basketball has been a significant part of my life, teaching me teamwork, discipline, and the importance of staying active."}
                  {i === 2 && "I have a wonderful dog named Luna, who is a beagle! She brings so much joy and energy to my life. Luna loves going on long walks and is always excited to meet new people. Having a pet has taught me responsibility and unconditional love."}
                  {i === 3 && "I have been fortunate to travel to over 30 countries and have lived in 6 different cities throughout my life. This extensive travel experience has broadened my perspective, enhanced my cultural awareness, and given me the ability to adapt to diverse environments and work with people from various backgrounds."}
                </p>
              </div>
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
          <a href="https://github.com/cmglmsr" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer text-blue-400 hover:text-blue-300 transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/cem-g%C3%BCl%C3%BCmser-2b685a213/" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer text-blue-400 hover:text-blue-300 transition-colors">
            LinkedIn
          </a>
          <a href="https://www.npmjs.com/~cmglmsr" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer text-blue-400 hover:text-blue-300 transition-colors">
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
        return renderListPage("Projects");
      case "awards":
        return renderListPage("Awards");
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
