import React from "react";
import { Button } from "@nextui-org/react";

function HeaderFooter() {
  return (
    <div className="bg-[#242323] max-w-[900px] mx-auto rounded-2xl p-10  my-10">
      <div className="flex items-center justify-between px-14">
        <div>
          <h1 className="max-w-[500px] text-3xl tracking-wide leading-9 font-bold mb-7 text-white">Revolutionize Your OJT Experience with InternTrack</h1>
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
    </div>
  );
}

export default HeaderFooter;
