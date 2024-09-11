import * as React from "react";

interface CaughtPokemonModalProps {
  pokemonName: string;
  nickname: string;
  error: string;
  onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const CaughtPokemonModal: React.FC<CaughtPokemonModalProps> = ({
  pokemonName,
  nickname,
  error,
  onNicknameChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-dark-light rounded-lg p-6 max-w-sm w-full text-center mt-[-5rem]">
        <h2 className="text-xl font-bold mb-4">
          You&apos;ve caught {pokemonName}!
        </h2>
        <input
          type="text"
          placeholder="Enter a nickname"
          value={nickname}
          onChange={onNicknameChange}
          className="w-full p-2 border rounded mb-0"
        />
        {error && <p className="text-red-500 my-2">{error}</p>}
        <div className="flex justify-center mt-4">
          <button
            onClick={onCancel}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-700 text-white rounded font-medium flex-1"
          >
            Save Pokémon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaughtPokemonModal;
