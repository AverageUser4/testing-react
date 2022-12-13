import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App/>', () => {
  let emailInput, passwordInput, confirmPasswordInput;

  function setup() {
    render(<App/>);
    emailInput = screen.getByRole('textbox', { name: /email/i });
    passwordInput = screen.getByLabelText('Password:');
    confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  }

  describe('general', () => {

    test('inputs should be empty when initially rendered', () => {
      setup();
      
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
      expect(confirmPasswordInput.value).toBe('');
    });
    
    test('user should be able to type into email input', () => {
      setup();
      
      userEvent.type(emailInput, 'abc123');
      expect(emailInput.value).toBe('abc123');
    });
  
    test('user should be able to type into password input', () => {
      setup();
      
      userEvent.type(passwordInput, 'abc123');
      expect(passwordInput.value).toBe('abc123');
    });
    
    test('user should be able to type into confirm password input', () => {
      setup();
      
      userEvent.type(confirmPasswordInput, 'abc123');
      expect(confirmPasswordInput.value).toBe('abc123');
    });

  });
  
  describe('error handling', () => {
    let emailInput, passwordInput, confirmPasswordInput, submitButton, errorContainer;

    function setup() {
      render(<App/>);
      emailInput = screen.getByRole('textbox', { name: /email/i });
      passwordInput = screen.getByLabelText('Password:');
      confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      submitButton = screen.getByRole('button', { name: /submit/i });
      errorContainer = screen.queryByRole('alert');
    }

    function submitAndGetError() {
      userEvent.click(submitButton);
      errorContainer = screen.queryByRole('alert');
    }

    function assertErrorOf(what) {
      switch(what) {
        case 'email':
          expect(errorContainer.textContent).toMatch(/invalid email/i);
          break;

        case 'password':
          expect(errorContainer.textContent).toMatch(/invalid password/i);
          break;

        case 'passwordConfirm':
          expect(errorContainer.textContent).toMatch(/passwords do/i);
          break;
          
        default:
          throw new Error(`Asserted error of unrecognized input '${what}'. typeof provided argument: '${typeof what}'`);
      }
    }

    test('error does not get initially rendered', () => {
      setup();

      expect(errorContainer).not.toBeInTheDocument();
    });

    test('error does not get rendered after submitting valid form', () => {
      setup();

      userEvent.type(emailInput, 'adam@example.com');
      userEvent.type(passwordInput, 'adam123');
      userEvent.type(confirmPasswordInput, 'adam123');
      submitAndGetError();

      expect(errorContainer).not.toBeInTheDocument();
    });

    test('error disappears after submitting valid form', () => {
      setup();

      submitAndGetError();
      expect(errorContainer).toBeInTheDocument();
      
      userEvent.type(emailInput, 'adam@example.com');
      userEvent.type(passwordInput, 'adam123');
      userEvent.type(confirmPasswordInput, 'adam123');
      submitAndGetError();

      expect(errorContainer).not.toBeInTheDocument();
    });

    test("ALL INPUTS INVALID: email's error message is shown", () => {
      setup();

      submitAndGetError();
      assertErrorOf('email');
    });
    
    test("VALID EMAIL, INVALID PASSWORD, INVALID CONFIRM: passwords's error message is shown", () => {
      setup();
      
      userEvent.type(emailInput, 'adam@example.com');
      submitAndGetError();
      assertErrorOf('password');
    });

    test("VALID EMAIL, VALID PASSWORD, INVALID PASSWORD CONFIRM: passwordConfirm's error message is shown", () => {
      setup();

      userEvent.type(emailInput, 'adam@example.com');
      userEvent.type(passwordInput, 'admin123');
      submitAndGetError();
      assertErrorOf('passwordConfirm');
    });

  });
  
});