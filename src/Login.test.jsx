import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  
  test('renders login form with all elements', () => {
    render(<Login />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders input fields with correct placeholders', () => {
    render(<Login />);
    
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('updates email input value on change', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('updates password input value on change', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password123');
    
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows error when email is empty on submit', async () => {
    render(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('shows error when password is empty on submit', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('shows error when email format is invalid', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'invalidemail');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  test('shows error when password is less than 6 characters', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });

  test('clears email error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 't');
    
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  test('clears password error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
    
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'p');
    
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });

  test('applies error class to input when there is an error', async () => {
    render(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveClass('input-error');
    });
  });

  test('successfully submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Login Successful!')).toBeInTheDocument();
      expect(screen.getByText('Welcome, test@example.com')).toBeInTheDocument();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Login successful:', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    consoleSpy.mockRestore();
  });

  test('shows success message with user email after successful login', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'secure123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, john@example.com')).toBeInTheDocument();
    });
  });

  test('renders logout button after successful login', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
  });

  test('resets form when logout button is clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });
    
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Password')).toHaveValue('');
    });
  });

  test('validates email with whitespace only as invalid', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, '   ');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('validates password with whitespace only as invalid', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '   ');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('prevents form submission with preventDefault', () => {
    render(<Login />);
    
    const form = screen.getByRole('button', { name: /login/i }).closest('form');
    const mockPreventDefault = jest.fn();
    
    fireEvent.submit(form, { preventDefault: mockPreventDefault });
    
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  test('accepts email with multiple dots in domain', async () => {
    const user = userEvent.setup();
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    await user.type(emailInput, 'user@mail.co.uk');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    });
  });

  test('does not show errors initially', () => {
    render(<Login />);
    
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is invalid')).not.toBeInTheDocument();
  });
});
