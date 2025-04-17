import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders player form initially', () => {
  render(<App />);
  const playerForm = screen.getByTestId('player-form');
  expect(playerForm).toBeInTheDocument();
});
