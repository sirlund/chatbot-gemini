import { motion } from 'motion/react';

export function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2 sm:gap-3"
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-[10px] sm:text-xs font-medium shrink-0">
        AI
      </div>
      <div className="bg-white/[0.05] rounded-2xl rounded-tl-md px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-teal-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
