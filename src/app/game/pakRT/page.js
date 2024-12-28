"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const dialogData = [
  {
    nama: "Kamu",
    text: "Selamat pagi, Pak RT. Saya penghuni baru di sini.",
  },
  {
    nama: "Pak RT",
    text: "Selamat pagi! Selamat datang. Kamu sudah tau peraturan lingkungan di sini?",
    options: {
      a: "Belum, Pak. Kalau boleh tau peraturannya apa saja ya pak? Saya ingin memastikan saya tidak akan melanggar.",
      b: "Belum, pak. Tapi sepertinya ngga usah, saya yakin bisa menyesuaikan diri.",
    },
    response: {
      a: "Oh iya, setiap pukul 9 malam, kami selalu mengupayakan agar lingkungan tetap tenang, tidak bising dan gaduh untuk menghargai waktu istirahat tetangga lainnya.",
      b: "Oh. Semoga kamu tidak membuat kekacauan.",
    },
  },
  {
    nama: "Kamu",
    text: "Pagi Pak RT. Saya saat ini sudah mengidap kusta tahap ketiga. Saya khawatir bisa bertambah parah. Apakah saya bisa meminta bantuan pengobatan?",
  },
  {
    nama: "Pak RT",
    text: " Tahap ketiga? Saya khawatir itu menular.",
    options: {
      b: "Kenapa harus takut? Saya bukan parasit yang bisa merugikan orang-orang. Saya juga tidak mau terkena kusta ini.",
      a: "tidak perlu khawatir, Pak. Kusta tidak menular dengan sangat cepat. Apabila segera diobati, maka kemungkinan penyembuhannya lebih cepat.",
    },
    response: {
      a: "Baiklah, saya akan coba meminta bantuan dari Rumah Sakit terdekat. Sebaiknya kamu beristirahat saja.",
      b: "Dasar kandala', jangan lagi kau minta bantuanku. Selain cacat fisik, ternyata kau juga cacat akhlak!",
    },
  },
];

export default function PakRTPage() {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isQuestion, setIsQuestion] = useState(false);
  const [gameProgress, setGameProgress] = useState("start");

  useEffect(() => {
    let status = localStorage.getItem("gameStatus");
    if (!status) status = "start";
    setGameProgress(status);
    console.log(status);
  }, []);

  useEffect(() => {
    if (gameProgress === "mid") {
      setIndex(2);
    }
    console.log(gameProgress);
  }, [gameProgress]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsQuestion(false);
  };

  const handleBack = () => {
    if (selectedOption === "b") return;

    if (gameProgress === "start") localStorage.setItem("gameStatus", "quarter");
    else if (gameProgress === "quarter")
      localStorage.setItem("gameStatus", "mid");
    else if (gameProgress === "mid")
      localStorage.setItem("gameStatus", "finish");
  };

  const handleContinueClick = () => {
    if (index === dialogData.length - 1 && selectedOption) {
      return;
    }
    if (dialogData[index].options) {
      setIsQuestion(true);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const selectExpression = () => {
    if (!selectedOption) return "/img/Pak RT_senyum .png";
    else if (selectedOption === "a")
      return "/img/Pak RT_senyum keliatan gigi .png";
    else if (selectedOption === "b") return "/img/Pak RT_marah.png";
  };

  const kustaExpression = () => {
    if (gameProgress === "start") return "/img/Hands.png";
    else if (gameProgress === "mid") return "/img/Kusta2.png";
    else if (gameProgress === "quarter") return "/img/Hands.png";
    else if (gameProgress === "finish") return "/img/Kusta2.png";
  };

  const heartExpression = () => {
    if (gameProgress === "start" && selectedOption === "a")
      return "/img/one heart.png";
    else if (gameProgress === "start") return "/img/empty heart.png";
    else if (gameProgress === "mid" && selectedOption === "a")
      return "/img/full heart.png";
    else if (gameProgress === "mid") return "/img/four heart.png";
    else if (gameProgress === "quarter") return "/img/one heart.png";
    else if (gameProgress === "finish") return "/img/full heart.png";
  };

  return (
    <div className="h-screen w-screen bg-[url('/img/insidehouse.png')] bg-cover bg-no-repeat bg-center relative overflow-hidden">
      <div className="absolute bottom-0 w-full h-60 bg-gradient-to-t from-[#ae7a42c6] to-transparent z-0"></div>
      <Image
        src={kustaExpression()}
        alt="Hands"
        layout="fill"
        objectFit="cover"
        className="z-10"
      />
      <div className="w-screen h-screen relative overflow-hidden flex justify-center items-center">
        <Image
          src={selectExpression()}
          alt="Pak RT"
          width={850}
          height={850}
          className="object-contain absolute top-0 z-0"
        />
      </div>
      <Image
        src={heartExpression()}
        alt="Empty heart"
        width={150}
        height={120}
        className="transform -rotate-90 m-4 mt-2 absolute -top-28 right-10 sm:right-20 scale-75 sm:scale-100 z-20"
      />

      <div className="mx-6 lg:mx-0 absolute bottom-10 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto h-auto text-2xl bg-white rounded-lg border-[3px] border-black shadow-md flex flex-col p-4 space-y-4">
          <p className="text-3xl">
            <strong>{isQuestion ? "Kamu" : dialogData[index].nama}:</strong>
          </p>
          {!isQuestion && !selectedOption && <p>{dialogData[index].text}</p>}

          {isQuestion &&
            dialogData[index].options &&
            Object.entries(dialogData[index].options).map(([key, option]) => (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className="bg-[#eb6e2f] border-2 border-black  text-white rounded-md px-4 py-2 text-left hover:bg-white hover:text-[#eb6e2f] hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
                {option}
              </button>
            ))}

          {selectedOption && (
            <>
              <p>{dialogData[index].response[selectedOption]}</p>
              <Link
                href="/game"
                onClick={handleBack}
                className="self-end bg-[#eb6e2f] border-2 border-black text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#eb6e2f] hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
                Back
              </Link>
            </>
          )}

          {!isQuestion && !selectedOption && (
            <button
              onClick={handleContinueClick}
              className="self-end bg-[#eb6e2f] border-2 border-black text-white rounded-md px-4 py-2 hover:bg-white hover:text-[#eb6e2f] hover:-translate-y-0.5 transition-transform duration-300 ease-in-out">
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
