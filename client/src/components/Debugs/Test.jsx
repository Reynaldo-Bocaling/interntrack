import React from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';

const ScrollingDiv = () => {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  controls.start({ rotate: scrollY * 0.1 });

  return (
    <div className='h-[200vh]'>
    <motion.div
      className="fixed rounded-full w-20 h-20 bg-blue-500 flex items-center justify-center"
      animate={controls}
      transition={{ type: 'spring', stiffness: 50, damping: 10 }}
    >
      Scroll Me
    </motion.div>
    </div>
  );
};

export default ScrollingDiv;
