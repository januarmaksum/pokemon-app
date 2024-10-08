import Link from "next/link";
import Image from "next/image";
import { House, PokeballIco } from "@/components/Icons";

export default function BottomBar() {
  return (
    <footer className="bg-white dark:bg-dark flex fixed bottom-0 left-0 w-full justify-evenly px-4 py-2 lg:hidden shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1)]">
      <Link href="/" legacyBehavior>
        <a className="flex justify-center items-center flex-col text-xs font-medium">
          <House />
          Pokémon List
        </a>
      </Link>
      <Link href="/my-pokemon" legacyBehavior>
        <a className="flex justify-center items-center flex-col text-xs font-medium">
          <Image
            src={PokeballIco}
            alt="Pokeball"
            width={24}
            height={24}
          />
          My Pokémon
        </a>
      </Link>
    </footer>
  );
}
