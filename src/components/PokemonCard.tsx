import Image from "next/image";
import { useRouter } from "next/router";

interface PokemonCardProps {
  name: string;
  id?: number;
  imageUrl: string;
  nickname?: string;
}

export default function PokemonCard({
  name,
  imageUrl,
  nickname,
}: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-dark-light rounded-lg shadow-md overflow-hidden cursor-pointer pt-6"
    >
      <Image
        src={imageUrl}
        alt={name}
        className="w-full h-28 md:h-32 object-contain"
        width={230}
        height={230}
      />
      <div className="p-4 text-center">
        <h2 className="text-sm md:text-xl font-semibold capitalize text-gray-800 dark:text-white text-balance">
          {name}
        </h2>
        {nickname && <span>({nickname})</span>}
      </div>
    </div>
  );
}
