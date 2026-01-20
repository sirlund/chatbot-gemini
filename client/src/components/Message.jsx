import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export function Message({ content, isUser, isWarning = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-start gap-2 sm:gap-3',
        isUser && 'justify-end'
      )}
    >
      {!isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-[10px] sm:text-xs font-medium shrink-0">
          AI
        </div>
      )}

      <div
        className={cn(
          'max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3',
          isUser
            ? 'bg-white/[0.1] text-white rounded-tr-md'
            : 'bg-white/[0.05] text-white/90 rounded-tl-md',
          isWarning && 'bg-amber-500/10 border border-amber-500/20 text-amber-300/90'
        )}
      >
        {isUser ? (
          <p className="text-sm sm:text-base leading-relaxed">{content}</p>
        ) : (
          <div className="markdown-content text-sm sm:text-base">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.1] flex items-center justify-center text-white/70 text-[10px] sm:text-xs font-medium shrink-0">
          Tú
        </div>
      )}
    </motion.div>
  );
}
