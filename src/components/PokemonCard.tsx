import Image from "next/image";

interface PokemonCardProps {
    name: string;
    id?: number;
    imageUrl: string;
  }
  
  export default function PokemonCard({ name, imageUrl }: PokemonCardProps) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-32 object-contain"
          width={230}
          height={230}
        />
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold capitalize text-gray-800 dark:text-white">{name}</h2>
        </div>
      </div>
    );
  }
  