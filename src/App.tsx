import React, { useState } from 'react';
import Board from './Board';
import { SquaresArray } from './types';

import PlayerForm from './PlayerForm';
import RestartButton from './RestartButton';

export default function App(): React.ReactElement {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<SquaresArray[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [gameStared, setGameStared] = useState(false);

  // Players are still named playerX and playerO for conveniece, even though they will have different names.
  const [playerXName, setPlayerXName] = useState<string>('');
  const [playerOName, setPlayerOName] = useState<string>('');

  const currentSquares: SquaresArray = history[currentMove];

  function handlePlay(nextSquares: SquaresArray): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function handleRestart() {
    // Resetting gameStarted will show the form again
    setGameStared(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  function handleNamesSet(nameX: string, nameO: string): void {
    setPlayerXName(nameX);
    setPlayerOName(nameO);
    setGameStared(true);
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = 'Move ' + move;
    } else {
      description = 'Game start';
    }
    return (
      <li key={move} className="turn-list-item">
        <button onClick={() => jumpTo(move)} className="turn-button">
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      {!gameStared ? (
        <div data-testid="player-form">
          <PlayerForm
            playerXName={playerXName}
            playerOName={playerOName}
            onNamesSet={handleNamesSet}
          />
        </div>
      ) : (
        <div className="game-container" data-testid="game-container">
          <div className="game-content">
            <div className="game-board">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                playerXName={playerXName}
                playerOName={playerOName}
              />
            </div>
            <RestartButton onClick={handleRestart} />
          </div>
          <div className="game-info">
            <h3 className="game-info-header">Go to:</h3>
            <ol className="turn-list">{moves}</ol>
          </div>
        </div>
      )}
    </div>
  );
}
