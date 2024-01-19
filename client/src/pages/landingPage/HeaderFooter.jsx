import React from "react";
import { Button } from "@nextui-org/react";
import {motion} from 'framer-motion'
function HeaderFooter() {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{y:[-20, 0], opacity: 1}}
    transition={{duration: 1}}
    className="bg-[#242323] max-w-[900px] mx-auto rounded-2xl p-10  my-10">
      <div className="flex flex-col md:flex-row items-center justify-between md:px-14">
        <div>
          <h1 className="max-w-[500px] text-2xl md:text-3xl tracking-wide leading-9 font-bold mb-7 text-white">Revolutionize Your OJT Experience with InternTrack</h1>
          <p className="max-w-[400px] text-white text-sm tracking-wide">
            Explore the next level of OJT management with InternTrack. Simplify
            intern tracking, streamline tasks, and elevate communication
            effortlessly. Experience efficiency like never before!
          </p>
        </div>

        <Button
          size="lg"
          className="mt-5 bg-white text-black rounded-full font-medium px-10 hover:-translate-x-2 hover:transition-all"
        >
          Sign in
        </Button>
      </div>
    </motion.div>
  );
}

export default HeaderFooter;
