// components/LoadingAnimation.js
import { motion } from "framer-motion";

export function LoadingAnimation({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-200 dark:bg-zinc-950 bg-opacity-90 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-12 bg-slate-200/80 dark:bg-zinc-950/80 p-8 rounded-xl shadow-xl text-center max-w-sm w-full"
      >
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer spinning circle */}
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["50% 50%", "30% 70%", "50% 50%"],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              borderRadius: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 border-4 border-gray-50 border-t-transparent"
          />

          {/* Inner pulsing dot */}
          <motion.div
            animate={{
              scale: [0.7, 1, 0.7],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-3 bg-blue-500 rounded-full"
          />
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-medium text-gray-800 mb-2"
        >
          {message}
        </motion.h3>

        {/* Progress bar */}
        <div className="w-full h-1 bg-slate-200 dark:bg-zinc-950 rounded-full mt-4 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full bg-blue-500"
          />
        </div>
      </motion.div>
    </div>
  );
}

// Success animation that can be used when an action completes
export function SuccessAnimation({ message = "Success!", onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2,
          }}
          className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </motion.svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {message}
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-1 bg-green-500 mt-4 rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
