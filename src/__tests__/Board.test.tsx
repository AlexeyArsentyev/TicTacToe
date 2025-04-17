import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../Board';
import { SquaresArray } from '../types';

describe('Board', () => {
  const mockOnPlay = jest.fn();
  const initialSquares: SquaresArray = Array(9).fill(null);
  const playerXName = 'PlayerX';
  const playerOName = 'PlayerO';

  beforeEach(() => {
    mockOnPlay.mockClear();
  });

  test('renders initial board with correct status', () => {
    render(
      <Board
        xIsNext={true}
        squares={initialSquares}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );

    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(9);
    expect(screen.getByText('Next player:')).toBeInTheDocument();
    expect(screen.getByTestId('displayed-name')).toHaveTextContent(playerXName);
  });

  test('handles square click and calls onPlay', () => {
    render(
      <Board
        xIsNext={true}
        squares={initialSquares}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );

    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);

    const expectedNextSquares = initialSquares.slice();
    expectedNextSquares[0] = 'X';
    expect(mockOnPlay).toHaveBeenCalledWith(expectedNextSquares);
  });

  test('displays correct next player', () => {
    const { rerender } = render(
      <Board
        xIsNext={true}
        squares={initialSquares}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );
    expect(screen.getByTestId('displayed-name')).toHaveTextContent(playerXName);

    const squaresWithX: SquaresArray = ['X', null, null, null, null, null, null, null, null];
    rerender(
      <Board
        xIsNext={false}
        squares={squaresWithX}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );
    expect(screen.getByText('Next player:')).toBeInTheDocument();
    expect(screen.getByTestId('displayed-name')).toHaveTextContent(playerOName);
  });

  test('prevents clicking on an already filled square', () => {
    const squaresWithX: SquaresArray = ['X', null, null, null, null, null, null, null, null];
    render(
      <Board
        xIsNext={false}
        squares={squaresWithX}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );

    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // click on the squar already filled with X

    expect(mockOnPlay).not.toHaveBeenCalled();
  });

  test('declares the winner correctly and displays winner name and makes squares NOT clickable', () => {
    const winningSquares: SquaresArray = ['X', 'X', 'X', null, null, null, null, null, null];
    render(
      <Board
        xIsNext={false} // its O's turn, but X has already won
        squares={winningSquares}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );

    expect(screen.getByText('Winner:')).toBeInTheDocument();
    expect(screen.getByTestId('displayed-name')).toHaveTextContent(playerXName);

    // Try clicking another square after win
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[4]);
    expect(mockOnPlay).not.toHaveBeenCalled();
  });

  test('declares player O as winner correctly', () => {
    const winningSquares: SquaresArray = ['O', 'O', 'O', null, 'X', 'X', null, null, null];
    render(
      <Board
        xIsNext={true}
        squares={winningSquares}
        onPlay={mockOnPlay}
        playerXName={playerXName}
        playerOName={playerOName}
      />
    );

    expect(screen.getByText('Winner:')).toBeInTheDocument();
    expect(screen.getByTestId('displayed-name')).toHaveTextContent(playerOName);
  });
});
