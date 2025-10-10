import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LovePage: React.FC = () => {
  const navigate = useNavigate();

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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Heart size={20} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Back Button */}
        <div className="p-6">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-pink-200 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Title */}
            <motion.div
              className="mb-12"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                animate={floatingAnimation}
              >
                My Love
              </motion.h1>
              <motion.div
                className="flex justify-center gap-2 mb-4"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Star className="text-yellow-400" size={24} fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.p
                className="text-xl md:text-2xl text-pink-200 font-light"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                A special place for someone very dear to my heart
              </motion.p>
            </motion.div>

            {/* Photo Section */}
            <motion.div
              className="mb-12"
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative inline-block">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Your actual photo */}
                  <img
                    src="/images/facts/biz.jpg"
                    alt="Us together"
                    className="w-80 h-96 md:w-96 md:h-[500px] object-cover"
                  />
                  
                  {/* Sparkle decorations */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    <Sparkles size={24} className="text-yellow-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 1
                    }}
                  >
                    <Sparkles size={20} className="text-pink-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Love Messages */}
            <motion.div
              className="space-y-8 max-w-4xl mx-auto"
              variants={staggerContainer}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-pink-200"
                  animate={floatingAnimation}
                >
                  You Mean Everything to Me
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-pink-100"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  In this digital corner of my world, I wanted to create a space that's just for us. 
                  Every day with you feels like a beautiful dream, and I'm grateful for every moment we share together.
                </motion.p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-4 text-purple-200"
                  animate={floatingAnimation}
                >
                  My Promise to You
                </motion.h3>
                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-purple-100"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  I promise to always support your dreams, celebrate your victories, 
                  and be there for you through every challenge. You are my inspiration, 
                  my strength, and my greatest love.
                </motion.p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-4 text-indigo-200"
                  animate={floatingAnimation}
                >
                  Forever & Always
                </motion.h3>
                <motion.p
                  className="text-lg md:text-xl leading-relaxed text-indigo-100"
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  No matter where life takes us, know that my love for you will only grow stronger. 
                  You've made me a better person, and I can't wait to see what beautiful adventures 
                  await us together.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Floating Hearts */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={32} className="text-pink-400" fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center p-6 text-pink-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-sm">Made with 💕 for someone very special</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LovePage;
