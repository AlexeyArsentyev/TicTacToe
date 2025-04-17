import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerForm from '../PlayerForm';

describe('PlayerForm', () => {
  const mockOnNamesSet = jest.fn();

  beforeEach(() => {
    mockOnNamesSet.mockClear();
  });

  test('renders correctly with initial empty names', () => {
    render(<PlayerForm playerXName="" playerOName="" onNamesSet={mockOnNamesSet} />);

    expect(screen.getByLabelText(/First player:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Second player:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Player X')).toHaveValue('');
    expect(screen.getByPlaceholderText('Player O')).toHaveValue('');
    expect(screen.getByRole('button', { name: /Start!/i })).toBeInTheDocument();
  });

  test('renders correctly with initial provided names', () => {
    render(<PlayerForm playerXName="Alice" playerOName="Bob" onNamesSet={mockOnNamesSet} />);

    expect(screen.getByLabelText(/First player:/i)).toHaveValue('Alice');
    expect(screen.getByLabelText(/Second player:/i)).toHaveValue('Bob');
  });

  test('updates input fields on change', () => {
    render(<PlayerForm playerXName="" playerOName="" onNamesSet={mockOnNamesSet} />);

    const inputX = screen.getByLabelText(/First player:/i);
    const inputO = screen.getByLabelText(/Second player:/i);

    fireEvent.change(inputX, { target: { value: 'somebody1' } });
    fireEvent.change(inputO, { target: { value: 'somebody2' } });

    expect(inputX).toHaveValue('somebody1');
    expect(inputO).toHaveValue('somebody2');
  });

  test('calls onNamesSet with entered names on submit', () => {
    render(<PlayerForm playerXName="" playerOName="" onNamesSet={mockOnNamesSet} />);

    const inputX = screen.getByLabelText(/First player:/i);
    const inputO = screen.getByLabelText(/Second player:/i);
    const submitButton = screen.getByRole('button', { name: /Start!/i });

    fireEvent.change(inputX, { target: { value: 'a' } });
    fireEvent.change(inputO, { target: { value: 'b' } });
    fireEvent.click(submitButton);

    expect(mockOnNamesSet).toHaveBeenCalledTimes(1);
    expect(mockOnNamesSet).toHaveBeenCalledWith('a', 'b');
  });

  test('calls onNamesSet with default names if inputs are empty on submit', () => {
    render(<PlayerForm playerXName="" playerOName="" onNamesSet={mockOnNamesSet} />);

    const submitButton = screen.getByRole('button', { name: /Start!/i });
    fireEvent.click(submitButton);

    expect(mockOnNamesSet).toHaveBeenCalledTimes(1);
    expect(mockOnNamesSet).toHaveBeenCalledWith('Player X', 'Player O');
  });
});
