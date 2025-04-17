import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

const setupGame = (playerXName = 'Alice', playerOName = 'Bob') => {
  render(<App />);
  const inputX = screen.getByLabelText(/First player:/i);
  const inputO = screen.getByLabelText(/Second player:/i);
  const submitButton = screen.getByRole('button', { name: /Start!/i });

  fireEvent.change(inputX, { target: { value: playerXName } });
  fireEvent.change(inputO, { target: { value: playerOName } });
  fireEvent.click(submitButton);

  return { playerXName, playerOName };
};

test('renders player form initially and hides game container', () => {
  render(<App />);
  const playerForm = screen.getByTestId('player-form');
  expect(playerForm).toBeInTheDocument();

  const gameContainer = screen.queryByTestId('game-container');
  expect(gameContainer).not.toBeInTheDocument();
});

test('renders game container after names are set and hides player form', () => {
  setupGame();

  const playerForm = screen.queryByTestId('player-form');
  expect(playerForm).not.toBeInTheDocument();

  const gameContainer = screen.getByTestId('game-container');
  expect(gameContainer).toBeInTheDocument();
});

test('displays correct player name in initial status', () => {
  const { playerXName } = setupGame('Alice', 'Bob');

  const name = screen.getByTestId('displayed-name');
  expect(name.textContent).toBe(playerXName);
});

test('resets the game and shows player form when restart button is clicked', () => {
  const { playerXName, playerOName } = setupGame('Player1', 'Player2');

  expect(screen.getByTestId('game-container')).toBeInTheDocument();
  expect(screen.queryByTestId('player-form')).not.toBeInTheDocument();

  const restartButton = screen.getByTestId('restart-button');
  fireEvent.click(restartButton);

  expect(screen.getByTestId('player-form')).toBeInTheDocument();
  expect(screen.queryByTestId('game-container')).not.toBeInTheDocument();

  expect(screen.getByLabelText(/First player:/i)).toHaveValue(playerXName);
  expect(screen.getByLabelText(/Second player:/i)).toHaveValue(playerOName);
});

test('allows time travel to previous moves and updates history correctly', () => {
  setupGame();

  const squares = screen.getAllByTestId('square');

  // move 1: playerX clicks square 0
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent('X');

  // move 2: plerO clicks square 4
  fireEvent.click(squares[4]);
  expect(squares[4]).toHaveTextContent('O');

  // Move 3: X clicks square 8
  fireEvent.click(squares[8]);
  expect(squares[8]).toHaveTextContent('X');

  // Check history list has 4 items (Start + 3 moves)
  let historyButtons = screen.getAllByRole('button', { name: /Move|Game start/i });
  expect(historyButtons).toHaveLength(4); // Game start, Move 1, Move 2, Move 3

  // click move 1
  const goToMove1Button = screen.getByRole('button', { name: /Move 1/i });
  fireEvent.click(goToMove1Button);

  // Verify board state reverted to Move 1
  expect(squares[0]).toHaveTextContent('X');
  expect(squares[4]).toHaveTextContent('');
  expect(squares[8]).toHaveTextContent('');

  // Make a new move (move 2 alternative): O clicks square 5
  fireEvent.click(squares[5]);
  expect(squares[5]).toHaveTextContent('O');

  expect(squares[0]).toHaveTextContent('X');
  expect(squares[4]).toHaveTextContent('');
  expect(squares[5]).toHaveTextContent('O');
  expect(squares[8]).toHaveTextContent('');

  // check history list has been updated, original two moves should be gone
  historyButtons = screen.getAllByRole('button', { name: /Move|Game start/i });
  expect(historyButtons).toHaveLength(3); // Game start, Move 1, Move 2 (new)
  expect(screen.queryByRole('button', { name: /Move 3/i })).not.toBeInTheDocument();
});

test('switches turns correctly between players', () => {
  const { playerXName, playerOName } = setupGame();

  let statusName = screen.getByTestId('displayed-name');
  expect(statusName.textContent).toBe(playerXName);
  const squares = screen.getAllByTestId('square');
  fireEvent.click(squares[0]);
  statusName = screen.getByTestId('displayed-name');
  expect(statusName.textContent).toBe(playerOName);

  fireEvent.click(squares[1]);

  statusName = screen.getByTestId('displayed-name');
  expect(statusName.textContent).toBe(playerXName);
});
