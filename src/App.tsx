import React, { useState } from 'react';
import Board from './Board.tsx';
import { SquaresArray } from './types';
import restartIcon from './icons/restartIcon.svg';

export default function App(): React.ReactElement {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<SquaresArray[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [gameStared, setGameStared] = useState(false);
  const currentSquares: SquaresArray = history[currentMove];

  function handlePlay(nextSquares: SquaresArray): void {
    if (currentMove === 0 && !gameStared) {
      setGameStared(true);
    }
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
    jumpTo(0);
    setGameStared(false);

    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-content">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <button onClick={handleRestart}>
          <img src={restartIcon} alt="restart-icon" />
        </button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
