import { EvolutionChain } from "@/interfaces";

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatHeight(height: number): string {
  return (height / 10).toFixed(1).replace(/\.0$/, "") + " m";
}

export function formatWeight(weight: number): string {
  return (weight / 10).toFixed(1).replace(/\.0$/, "") + " kg";
}

export const extractEvolutionChain = (chain: EvolutionChain) => {
  const evolutions = [];
  let currentStage: EvolutionChain | undefined = chain;

  while (currentStage) {
    const speciesName = currentStage.species.name;
    evolutions.push({
      name: speciesName,
      id: currentStage.species.url.split("/").slice(-2, -1)[0], // Extract ID from URL
    });
    currentStage = currentStage.evolves_to[0];
  }

  return evolutions;
};

export const removeDash = (str: string) => str.replace("-", " ");
