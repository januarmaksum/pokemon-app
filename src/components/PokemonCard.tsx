import Image from "next/image";
import { useRouter } from "next/router";
import { Trash2 } from "@/components/Icons";

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  nickname?: string;
  onDelete?: (nickname: string) => void;
}

export default function PokemonCard({
  name,
  imageUrl,
  nickname,
  onDelete,
}: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${name}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      onDelete &&
      nickname &&
      window.confirm(`Are you sure you want to delete ${name}?`)
    ) {
      onDelete(nickname);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-dark-light rounded-lg shadow-md overflow-hidden cursor-pointer pt-6 relative"
    >
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
      <Image
        src={imageUrl}
        alt={name}
        className="w-full h-28 md:h-32 object-contain px-4"
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
