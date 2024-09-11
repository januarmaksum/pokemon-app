import Link from "next/link";
import Image from "next/image";
import { House, Pokeball, PokeballDark } from "@/components/Icons";

export default function BottomBar() {
  return (
    <footer className="bg-white dark:bg-dark flex fixed bottom-0 left-0 w-full justify-evenly px-4 py-2 lg:hidden shadow-[0_-1px_6px_-1px_rgba(0,0,0,0.1)]">
      <Link href="/" legacyBehavior>
        <a className="flex justify-center items-center flex-col text-xs font-medium">
          <House />
          Home
        </a>
      </Link>
      <Link href="/my-pokemon" legacyBehavior>
        <a className="flex justify-center items-center flex-col text-xs font-medium">
          <Image
            src={Pokeball}
            alt="Pokeball"
            width={24}
            height={24}
            className="hidden dark:block"
          />
          <Image
            src={PokeballDark}
            alt="Pokeball"
            width={24}
            height={24}
            className="dark:hidden"
          />
          My Pokémon
        </a>
      </Link>
    </footer>
  );
}
