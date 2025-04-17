import React from 'react';
import Square from './Square';
import { calculateWinner, GameResult } from './calculateWinner'; // Import GameResult
import { SquaresArray } from './types';

interface BoardProps {
  xIsNext: boolean;
  squares: SquaresArray;
  onPlay: (nextSquares: SquaresArray) => void;
  playerXName: string;
  playerOName: string;
}

export default function Board({
  xIsNext,
  squares,
  onPlay,
  playerXName,
  playerOName,
}: BoardProps): React.ReactElement {
  function handleClick(i: number): void {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const gameResult: GameResult = calculateWinner(squares);
  let displayedName: string;
  let statusHeader: string;

  if (gameResult === 'Draw') {
    statusHeader = 'Game Over:';
    displayedName = 'Draw';
  } else if (gameResult) {
    // 'X' or 'O'
    displayedName = gameResult === 'X' ? playerXName : playerOName;
    statusHeader = 'Winner:';
  } else {
    displayedName = xIsNext ? playerXName : playerOName;
    statusHeader = 'Next player:';
  }

  return (
    <>
      <div className="status-container">
        <div className="status-header">{statusHeader} </div>
        <p className="displayed-name" data-testid="displayed-name">
          {displayedName}
        </p>
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
