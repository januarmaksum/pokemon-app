import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-dark shadow-md sticky top-0 z-50">
      <nav className="container max-w-3xl mx-auto px-4 py-0 flex justify-center lg:justify-between items-center relative">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-gray-800 dark:text-white">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={60}
              priority
              quality={100}
              className="w-40 md:w-48"
            />
          </a>
        </Link>

        <div className="flex justify-center space-x-6 absolute right-5">
          <Link href="/my-pokemon" legacyBehavior>
            <a className="text-gray-800 dark:text-white hover:text-blue-500 hidden md:block font-bold">
              My Pokémon
            </a>
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
