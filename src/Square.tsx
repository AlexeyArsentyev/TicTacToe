import React from 'react';
import { SquareValue } from './types';

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: SquareProps): React.ReactElement {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
