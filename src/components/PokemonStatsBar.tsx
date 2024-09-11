import * as React from "react";

interface StatBarProps {
  name: string;
  value: number;
}

const PokemonStatsBar: React.FC<StatBarProps> = ({ name, value }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-[#1a1a27]">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${(value / 255) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default PokemonStatsBar;
