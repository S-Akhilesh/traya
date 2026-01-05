import { motion } from 'framer-motion';

export default function HairfallLoader() {
  const circleAnimation = {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.3, 0.7, 0.3],
    rotate: [0, 360],
  };

  const circleTransition = {
    duration: 2,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const,
  };

  const dotAnimation = {
    scale: [0, 1.2, 0],
  };

  const dotTransition = {
    duration: 1,
    repeat: Infinity,
    ease: [0.4, 0, 0.6, 1] as const,
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className='bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center'
      >
        <div className='relative w-32 h-32 mx-auto mb-6'>
          <motion.div
            className='absolute inset-0 rounded-full border-4 border-primary-200'
            animate={circleAnimation}
            transition={circleTransition}
          />

          <motion.div
            className='absolute inset-4 rounded-full border-4 border-primary-300'
            animate={circleAnimation}
            transition={{ ...circleTransition, delay: 0.3 }}
          />

          <div className='absolute inset-8 rounded-full bg-primary-50 flex items-center justify-center overflow-hidden'>
            <motion.svg
              className='w-16 h-16 text-primary-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1, 0.9, 1],
                opacity: [0, 1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.5}
                d='M12 4 L10 10 L14 10 L12 4'
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.5}
                d='M8 8 L10 14 L14 14 L16 8'
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.3,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.5}
                d='M6 12 L8 18 L16 18 L18 12'
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.6,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            </motion.svg>
          </div>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 bg-primary-400 rounded-full'
              style={{
                top: `${20 + i * 15}%`,
                left: `${15 + (i % 3) * 35}%`,
              }}
              animate={dotAnimation}
              transition={{ ...dotTransition, delay: i * 0.2 }}
            />
          ))}
        </div>

        <motion.h2
          className='text-xl font-semibold text-gray-900 mb-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Processing Your Treatment Plan
        </motion.h2>
        <motion.p
          className='text-gray-600 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Analyzing your responses...
        </motion.p>

        <div className='flex justify-center gap-2 mt-6'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-primary-500 rounded-full'
              animate={dotAnimation}
              transition={{ ...dotTransition, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
