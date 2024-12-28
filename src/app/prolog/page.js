"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const storyText = [
  "Selamat datang di Zero Stigma Game! Game ini bertujuan untuk memberikan edukasi terkait kusta dan stigma yang melekat dengannya.",
  "Apakah kamu siap untuk menjadi agen Zero Stigma?",
];

export default function PrologPage() {
  const [index, setIndex] = useState(0);
  const [showNextIcon, setShowNextIcon] = useState(true);
  const [showPrevIcon, setShowPrevIcon] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    localStorage.setItem("gameStatus", "start");
  }, [isReady]);

  const handleNextClick = () => {
    setShowPrevIcon(true);
    setIndex((prevIndex) => prevIndex + 1);
    if (index === storyText.length - 2) {
      setShowNextIcon(false);
    }
  };

  const handlePrevClick = () => {
    setShowNextIcon(true);
    setIsReady(false);
    setIndex((prevIndex) => prevIndex - 1);
    if (index === 1) {
      setShowPrevIcon(false);
    }
  };

  const handleClick = () => {
    setIsReady(true);
  };

  return (
    <div className="h-screen w-screen bg-[url('/img/door.png')] bg-cover bg-no-repeat bg-center">
      <Image
        src="/img/Hands.png"
        alt="Hands"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="mx-6 lg:mx-0 absolute top-10 left-0 right-0 z-20">
        <div className="max-w-4xl mx-auto h-[200px] text-2xl bg-white rounded-lg border-[3px] border-black shadow-md flex flex-col items-center justify-center gap-5">
          <p className="max-w-2xl text-center flex justify-center items-center">
            {storyText[index]}
          </p>
          {!showNextIcon && (
            <button onClick={handleClick}>
              <p className="text-xl bg-[#eb6e2f] border-2 border-black text-white p-2 px-10 rounded-lg hover:bg-white hover:text-[#eb6e2f] hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
                Siap
              </p>
            </button>
          )}
        </div>
        <div className="max-w-4xl mx-auto relative bottom-10 px-2">
          <div className="flex flex-row justify-between w-full relative place-items-end">
            <button onClick={handlePrevClick} aria-label={`Text ${index - 1}`}>
              {showPrevIcon && (
                <ArrowLeftIcon
                  size={35}
                  className="hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
                />
              )}
            </button>
            <button onClick={handleNextClick} aria-label={`Text ${index + 1}`}>
              {showNextIcon && (
                <ArrowRightIcon
                  size={35}
                  className="hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
                />
              )}
            </button>

            {isReady && (
              <div>
                <div>
                  <p className=" text-base text-[#eb6e2f] animate-pulse">
                    Terima Kasih! Silahkan tekan pintu untuk melanjutkan...
                  </p>
                </div>
                <div className="absolute inset-0 top-72 right-10 flex justify-center items-center">
                  <Link href="/game">
                    <button className="w-[250px] h-[380px] flex justify-center items-center bg-transparent"></button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
