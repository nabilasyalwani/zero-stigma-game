import Image from "next/image";
import Link from "next/link";

const characters = [
  {
    name: "Pak RT",
    image: "/img/Pak RT_senyum keliatan gigi .png",
  },
  {
    name: "PNS",
    image: "/img/PNS.png",
  },
  {
    name: "Anak SMA",
    image: "/img/Anak SMA.png",
  },
];

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[url('/img/background2.png')] bg-cover bg-no-repeat bg-top">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-transparent to-[#ffe4e4] z-10 opacity-30"></div>
      <Image
        src="/img/Hands.png"
        alt="Hands"
        layout="fill"
        objectFit="cover"
        className="z-20"
      />
      <div className="absolute bottom-2 left-0 right-0">
        <div className="flex flex-row space-x-8 justify-center items-center">
          {characters.map((character) => (
            <div key={character.name} className="flex flex-col items-center">
              <Image
                src={character.image}
                alt={character.name}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-28 sm:top-12 left-0 right-0 z-0 ">
        <div className="flex flex-row gap-6 sm:gap-16 justify-center text-black items-center ">
          <h1 className="transform rotate-[-10deg] text-7xl sm:text-[9rem]">
            ZER0
          </h1>
          <h1 className="transform rotate-[10deg] text-[70px] sm:text-9xl">
            STIGMA
          </h1>
        </div>
      </div>

      <div className="absolute top-[40%] md:top-[46%] left-0 right-0 z-30">
        <div className="flex-col gap-4 md:space-x-36 flex md:flex-row justify-evenly text-black text-4xl md:text-6xl items-center">
          <Link
            href="/prolog"
            className=" px-12 py-2 bg-transparent backdrop-blur-lg backdrop-brightness-150 rounded-xl border-[3px] border-black shadow-md shadow-gray hover:backdrop-brightness-[200%] hover:border-4 transition-transform ease-in-out">
            New Game
          </Link>
          <Link
            href="/prolog"
            className=" px-12 py-2 bg-transparent backdrop-blur-lg backdrop-brightness-150 rounded-xl border-[3px] border-black shadow-md shadow-gray hover:backdrop-brightness-[200%] hover:border-4 transition-transform ease-in-out">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
