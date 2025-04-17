import React, { useState } from 'react';

interface PlayerFormProps {
  playerXName: string;
  playerOName: string;
  onNamesSet: (nameX: string, nameO: string) => void;
}

export default function PlayerForm({
  playerXName,
  playerOName,
  onNamesSet,
}: PlayerFormProps): React.ReactElement {
  const [nameX, setNameX] = useState<string>(playerXName);
  const [nameO, setNameO] = useState<string>(playerOName);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNamesSet(nameX || 'Player X', nameO || 'Player O'); // Use default if empty
  };

  return (
    <form onSubmit={handleSubmit} className="player-form">
      <h2>Enter Player Names</h2>
      <div>
        <label htmlFor="playerX">Player X:</label>
        <input
          type="text"
          id="playerX"
          value={nameX}
          onChange={(e) => setNameX(e.target.value)}
          placeholder="Player X"
        />
      </div>
      <div>
        <label htmlFor="playerO">Player O:</label>
        <input
          type="text"
          id="playerO"
          value={nameO}
          onChange={(e) => setNameO(e.target.value)}
          placeholder="Player O"
        />
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
}
