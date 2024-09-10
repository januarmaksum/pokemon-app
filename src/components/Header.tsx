import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 hidden md:block">
      <nav className="container max-w-3xl mx-auto px-4 py-0 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-gray-800 dark:text-white">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={60}
              priority
              quality={100}
            />
          </a>
        </Link>

        <div className="flex justify-center space-x-6">
          {/* <Link href="/" legacyBehavior>
            <a className="text-gray-800 dark:text-white hover:text-blue-500">
              Home
            </a>
          </Link> */}
          <Link href="/my-pokemon" legacyBehavior>
            <a className="text-gray-800 dark:text-white hover:text-blue-500">
              My Pokémon
            </a>
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
