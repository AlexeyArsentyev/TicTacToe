import { calculateWinner } from '../calculateWinner';
import { SquaresArray } from '../types';

describe('calculateWinner', () => {
  it('should return null for an empty board', () => {
    const squares: SquaresArray = Array(9).fill(null);
    expect(calculateWinner(squares)).toBeNull();
  });

  it('should return "X" when X wins horizontally', () => {
    const squares: SquaresArray = ['X', 'X', 'X', null, 'O', null, 'O', null, null];
    expect(calculateWinner(squares)).toBe('X');
  });

  it('should return "O" when O wins vertically', () => {
    const squares: SquaresArray = ['O', 'X', null, 'O', 'X', null, 'O', null, 'X'];
    expect(calculateWinner(squares)).toBe('O');
  });

  it('should return "X" when X wins diagonally', () => {
    const squares: SquaresArray = ['X', 'O', null, 'O', 'X', null, null, 'O', 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });

  it('should return "O" when O wins diagonally (other diagonal)', () => {
    const squares: SquaresArray = [null, 'X', 'O', 'X', 'O', null, 'O', 'X', null];
    expect(calculateWinner(squares)).toBe('O');
  });

  it('should return null when there is a draw', () => {
    const squares: SquaresArray = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(calculateWinner(squares)).toBeNull();
  });

  it('should return null when the game is ongoing', () => {
    const squares: SquaresArray = ['X', 'O', 'X', 'O', 'X', null, 'O', 'X', 'O'];
    expect(calculateWinner(squares)).toBeNull();
  });

  it('should return true even when impossible input is encountered', () => {
    const squares: SquaresArray = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    expect(calculateWinner(squares)).toBe('X');
  });
});
