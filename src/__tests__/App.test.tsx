import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  // Simulate typing names and submitting the form
  fireEvent.change(inputX, { target: { value: 'Alice' } });
  fireEvent.change(inputO, { target: { value: 'Bob' } });
  fireEvent.click(submitButton);

  const playerForm = screen.queryByTestId('player-form');
  expect(playerForm).not.toBeInTheDocument();

  const gameContainer = screen.getByTestId('game-container');
  expect(gameContainer).toBeInTheDocument();
});
