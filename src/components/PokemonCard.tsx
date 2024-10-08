import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { Trash2 } from "@/components/Icons";
import { removeDash } from "@/utils";

interface PokemonCardProps {
  name: string;
  id: number;
  imageUrl: string;
  nickname?: string;
  onDelete?: (nickname: string) => void;
}

export default function PokemonCard({
  id,
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
      className="bg-white dark:bg-dark-light lg:hover:dark:bg-gray-700 lg:hover:bg-slate-300 rounded-lg shadow-sm overflow-hidden cursor-pointer pt-6 relative"
    >
      <div className="absolute top-1 left-1 text-xs text-gray-400">
        #{String(id).padStart(4, "0")}
      </div>
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
      <Image
        src={imageUrl}
        alt={name}
        className="w-full h-28 md:h-32 object-contain px-4 drop-shadow-xl"
        width={230}
        height={230}
      />
      <div className="p-4 text-center">
        <h3 className="text-sm md:text-xl font-semibold capitalize text-gray-800 dark:text-white text-balance">
          {removeDash(name)}
        </h3>
        {nickname && (
          <div className="text-sm md:text-xl text-balance">({nickname})</div>
        )}
      </div>
    </div>
  );
}
