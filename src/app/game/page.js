"use client";

import Image from "next/image";
import React, { useState, useEffect, use } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

const storyText = [
  "Pada game ini, kamu akan menjadi salah satu pengidap penyakit kusta dan nantinya akan diberikan penjelasan lebih lanjut terkait tahapan kusta yang kamu alami.",
  "Untuk menyelesaikan permainan ini, kamu harus berinteraksi dengan warga dan meraih kepercayaan mereka. Kamu juga akan diberi kesempatan untuk mengadakan event yang bisa meningkatkan kepercayaan masyarakat luas!",
  "Penyakit kusta yang kamu alami kini memasuki tahap ketiga, yaitu Borderline Tuberculoid.",
  "Pada tahap ini, lesi yang kamu dapatkan bertambah (5-10 lesi). Apabila tidak segera diobati, lesi bisa berkembang menjadi tuberculoid. Tahap ini bisa menyebabkan kematian saraf, perubahan bentuk, dan disabilitas.",
  "Durasi pasien hingga mencapai tahap ini bisa 5-10 tahun.",
  "Kamu berhasil meraih kepercayaan seluruh warga! Kamu berhasil membuktikan bahwa stigma yang dialami masyarakat terkait 'orang kandala' itu tidak benar.",
  "Sebagai akhir dari permainan, kami akan menghadiahkanmu antibiotik (obat untuk kusta).",
  "Jangan lupa bahwa kusta sebaiknya ditangani sesegera mungkin untuk menghindari komplikasi lanjutan.",
  "Penderita kusta di luar sana juga membutuhkan dukungan darimu! Kini saatnya bagimu untuk menjadi Agen Zero Stigma di Kota Makassar!",
];

export default function GamePage() {
  const [questOpen, setQuestOpen] = useState(false);
  const [showPakRT, setShowPakRT] = useState(false);
  const [showIbuPNS, setShowIbuPNS] = useState(false);
  const [showAnakSMA, setShowAnakSMA] = useState(false);
  const [index, setIndex] = useState(0);
  const [showNextIcon, setShowNextIcon] = useState(true);
  const [showPrevIcon, setShowPrevIcon] = useState(false);
  const [gameProgress, setGameProgress] = useState("start");
  const [isFading, setIsFading] = useState(false);
  const [isTimeSkipped, setIsTimeSkipped] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("gameStatus");
    if (!status) status = "start";
    setGameProgress(status);
    console.log(status);
  }, []);

  useEffect(() => {
    if (gameProgress === "quarter") {
      spawnWithKusta();
    } else if (gameProgress === "mid") {
      setIndex(2);
    } else if (gameProgress === "finish") {
      setIndex(5);
    }
  }, [gameProgress]);

  const spawnWithKusta = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsFading(false);
      localStorage.setItem("gameStatus", "mid");
      setGameProgress("mid");
    }, 5000);
    setTimeout(() => {
      setIsTimeSkipped(true);
    }, 3000);
  };

  const handleNextClick = () => {
    setShowPrevIcon(true);
    setIndex((prevIndex) => prevIndex + 1);
    if (index === storyText.length - 2 || index === 0 || index === 3) {
      setShowNextIcon(false);
    }
  };

  const handlePrevClick = () => {
    setShowNextIcon(true);
    setIndex((prevIndex) => prevIndex - 1);
    if (index === 1 || index === 3 || index === 6) {
      setShowPrevIcon(false);
    }
  };

  const handleProgressBar = () => {
    if (gameProgress === "start") return "/img/empty bar.png";
    else if (gameProgress === "quarter") return "/img/low bar.png";
    else if (gameProgress === "mid") return "/img/mid bar.png";
    else if (gameProgress === "finish") return "/img/full bar.png";
  };

  const handleKustaExpression = () => {
    if (gameProgress === "start") return "/img/Hands.png";
    else if (gameProgress === "quarter") return "/img/Hands.png";
    else if (gameProgress === "mid") return "/img/Kusta2.png";
    else if (gameProgress === "finish") return "/img/Kusta2.png";
  };

  const handleQuestBoxClick = () => {
    setQuestOpen(!questOpen);
  };

  const handleSettingClick = () => {};

  const summonPakRT = () => {
    setShowPakRT(!showPakRT);
  };
  const summonIbuPNS = () => {
    setShowIbuPNS(!showIbuPNS);
  };
  const summonAnakSMA = () => {
    setShowAnakSMA(!showAnakSMA);
  };

  return (
    <>
      {isTimeSkipped && isFading && (
        <p className="h-screen w-screen text-2xl absolute flex text-center justify-center items-center z-50 text-white">
          Beberapa tahun kemudian...
        </p>
      )}
      <div
        className={`transition-container ${
          isFading ? "fade-out" : "fade-in"
        } h-screen w-screen bg-[url('/img/threehouse.png')] bg-cover bg-no-repeat bg-center`}>
        <Image
          src={handleKustaExpression()}
          alt="Hands"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="flex flex-row">
          <h1 className="text-3xl p-4 px-12 z-20 rounded-lg shadow-sm bg-white border-2 border-b-black border-r-black">
            {gameProgress === "start" || gameProgress === "quarter"
              ? "DAY 1"
              : "DAY 1094"}
          </h1>
          <Image
            src={handleProgressBar()}
            alt="Empty bar"
            width={150}
            height={120}
            className="transform rotate-90 absolute -top-28 right-10 sm:right-20 scale-75 sm:scale-100 z-20"
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <div className="flex flex-row justify-center p-4 gap-2">
            <button className="bg-black/25 p-2 text-white rounded-l-full hover:bg-black/40 hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
              <ChevronLeft size={50} />
            </button>
            <button className="bg-black/25 p-2 text-white rounded-r-full hover:bg-black/40 hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
              <ChevronRight size={50} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 z-10 ">
          <div className="flex flex-col gap-4 p-4">
            {gameProgress !== "quarter" && gameProgress !== "finish" && (
              <div className="flex flex-col items-center animate-bounce">
                <p> Quest box</p>
                <ArrowDown size={18} />
              </div>
            )}
            <button
              onClick={handleQuestBoxClick}
              disabled={
                gameProgress === "quarter" || gameProgress === "finish"
              }>
              <Image
                src="/img/quest box.png"
                alt="Quest box"
                width={65}
                height={65}
                className=" border-2 border-black bg-white hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
              />
            </button>
            <button onClick={handleSettingClick}>
              <Image
                src="/img/setting.png"
                alt="setting"
                width={65}
                height={65}
                className=" border-2 border-black bg-white hover:-translate-y-0.5 transition-transform duration-300 ease-in-out"
              />
            </button>
          </div>
        </div>

        {(questOpen || gameProgress === "finish") && (
          <div>
            <div className="mx-6 lg:mx-0 absolute top-10 left-0 right-0 z-0">
              <div className="max-w-4xl mx-auto h-[200px] text-2xl bg-white rounded-lg border-[3px] border-black shadow-md flex flex-col items-center justify-center">
                <p className="grow max-w-2xl text-center flex justify-center items-center">
                  {storyText[index]}
                </p>
              </div>
              <div className="max-w-4xl mx-auto relative bottom-10 px-2">
                <div className="flex flex-row justify-between w-full relative place-items-end z-50">
                  <button
                    onClick={handlePrevClick}
                    aria-label={`Text ${index - 1}`}>
                    {showPrevIcon && <ArrowLeftIcon size={35} />}
                  </button>
                  <button
                    onClick={handleNextClick}
                    aria-label={`Text ${index + 1}`}>
                    {showNextIcon && <ArrowRightIcon size={35} />}
                  </button>
                </div>
              </div>
            </div>
            {gameProgress !== "finish" && (
              <div className="absolute top-72 w-full flex justify-center animate-bounce">
                <div className="relative left-36">
                  <div className="flex flex-col items-center text-black">
                    <p>Click Here</p>
                    <ArrowDown size={18} />
                    <button
                      onClick={summonPakRT}
                      className="w-12 h-24"></button>
                  </div>
                </div>
                <div className="relative -left-[340px] xl:-left-[400px]">
                  <div className="flex flex-col items-center text-black">
                    <p>Click Here</p>
                    <ArrowDown size={18} />
                    <button
                      onClick={summonAnakSMA}
                      className="w-12 h-24"></button>
                  </div>
                </div>
                <div className="relative -right-96 xl:-right-[450px]">
                  <div className="flex flex-col items-center text-black">
                    <p>Click Here</p>
                    <ArrowDown size={18} />
                    <button
                      onClick={summonIbuPNS}
                      className="w-12 h-24"></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showPakRT && (
          <div className="absolute bottom-52 right-1/2">
            <Link href="/game/pakRT">
              <Image
                src="/img/Pak RT_senyum keliatan gigi .png"
                alt="Pak RT"
                width={120}
                height={120}
                className="z-0"
              />
            </Link>
          </div>
        )}
        {showIbuPNS && (
          <div className="absolute bottom-52 right-20">
            <Image
              src="/img/Anak SMA.png"
              alt="anak SMA"
              width={120}
              height={120}
              className="z-0"
            />
          </div>
        )}
        {showAnakSMA && (
          <div className="absolute bottom-52 left-40">
            <Image
              src="/img/PNS.png"
              alt="ibu PNS"
              width={120}
              height={120}
              className="z-0"
            />
          </div>
        )}
      </div>
    </>
  );
}
