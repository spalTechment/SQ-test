import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    render(<App />);
    const appDiv = screen.getByText('Login').closest('.App');
    expect(appDiv).toBeInTheDocument();
  });

  test('renders Login component inside App', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
