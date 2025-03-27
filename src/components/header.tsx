"use client";

import React from "react";
import Image from "next/image";
import { ModeToggle } from "./toggle-mode";
import profilePic from "../../public/logo.png";

const Header = () => {
  return (
    <header
      className="w-full flex justify-center items-center fixed top-0 bg-zinc-300 dark:bg-zinc-900 px-4 border-b border-zinc-400/20"
      role="banner"
    >
      <div className="max-w-7xl h-12 w-full flex justify-between items-center">
        <div className="flex center gap-1">
          <Image
            src={profilePic}
            alt="Picture of the author"
            className="w-6 object-contain dark:invert"
          />
          <a
            href="/"
            className="text-zinc-900 dark:text-white text-xl uppercase font-bold"
            aria-label="Home page for KWKWeather"
          >
            kwk
          </a>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
