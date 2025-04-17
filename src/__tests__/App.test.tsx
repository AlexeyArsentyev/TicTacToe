import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure jest-dom matchers are available
import App from '../App';

test('renders player form initially and hides game container', () => {
  render(<App />);
  const playerForm = screen.getByTestId('player-form');
  expect(playerForm).toBeInTheDocument();

  const gameContainer = screen.queryByTestId('game-container');
  expect(gameContainer).not.toBeInTheDocument();
});

test('renders game container after names are set and hides player form', () => {
  render(<App />);

  const inputX = screen.getByLabelText(/First player:/i);
  const inputO = screen.getByLabelText(/Second player:/i);
  const submitButton = screen.getByRole('button', { name: /Start!/i });

  fireEvent.change(inputX, { target: { value: 'Alice' } });
  fireEvent.change(inputO, { target: { value: 'Bob' } });
  fireEvent.click(submitButton);

  const playerForm = screen.queryByTestId('player-form');
  expect(playerForm).not.toBeInTheDocument();

  const gameContainer = screen.getByTestId('game-container');
  expect(gameContainer).toBeInTheDocument();
});

test('displays correct player name in initial status', () => {
  render(<App />);

  const inputX = screen.getByLabelText(/First player:/i);

  const submitButton = screen.getByRole('button', { name: /Start!/i });

  fireEvent.change(inputX, { target: { value: 'Alice' } });

  fireEvent.click(submitButton);

  const name = screen.getByTestId('displayed-name');
  expect(name.textContent).toBe('Alice');
});

test('resets the game and shows player form when restart button is clicked', () => {
  render(<App />);

  const inputX = screen.getByLabelText(/First player:/i);
  const inputO = screen.getByLabelText(/Second player:/i);
  const submitButton = screen.getByRole('button', { name: /Start!/i });
  fireEvent.change(inputX, { target: { value: 'Player1' } });
  fireEvent.change(inputO, { target: { value: 'Player2' } });
  fireEvent.click(submitButton);

  expect(screen.getByTestId('game-container')).toBeInTheDocument();
  expect(screen.queryByTestId('player-form')).not.toBeInTheDocument();

  const restartButton = screen.getByTestId('restart-button');
  fireEvent.click(restartButton);

  expect(screen.getByTestId('player-form')).toBeInTheDocument();
  expect(screen.queryByTestId('game-container')).not.toBeInTheDocument();

  expect(screen.getByLabelText(/First player:/i)).toHaveValue('Player1');
  expect(screen.getByLabelText(/Second player:/i)).toHaveValue('Player2');
});
