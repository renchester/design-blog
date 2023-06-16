'use client';

import './Form.scss';
import { useState } from 'react';
import debounce from 'lodash.debounce';

import AuthInput from './AuthInput';
import validateEmail from '@/utils/validators/validateEmail';
import validatePassword from '@/utils/validators/validatePassword';
import validateUsername from '@/utils/validators/validateUsername';
import checkEmailAvailability from '@/utils/checkEmailAvailability';
import checkUsernameAvailability from '@/utils/checkUsernameAvailability';

function SignupForm() {
  const DEBOUNCE_TIME = 1000;

  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [username, setUsername] = useState('');
  const [isUsernameValid, setUsernameValidity] = useState(false);
  const [usernameError, setUsernameError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordValid, setPasswordValidity] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMatches, setPasswordMatch] = useState(false);
  const [confirmationError, setConfirmationError] = useState('');

  const handleEmailChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setEmail(inputValue);

      try {
        const isValid = validateEmail(inputValue);
        const isAvailable = !!(await checkEmailAvailability(inputValue));
        setEmailValidity(isValid && isAvailable);
      } catch (error) {
        if (error instanceof Error) {
          setEmailValidity(false);
          setEmailError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handleUsernameChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setUsername(inputValue);

      try {
        const isValid = validateUsername(inputValue);
        const isAvailable = !!(await checkUsernameAvailability(inputValue));
        setUsernameValidity(isValid && isAvailable);
      } catch (error) {
        if (error instanceof Error) {
          setUsernameValidity(false);
          setUsernameError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setPassword(inputValue);

      const passwordsMatch = inputValue === passwordConfirmation;

      if (!passwordsMatch) {
        setPasswordMatch(false);
        setConfirmationError('Passwords do not match');
      }

      try {
        const isValid = validatePassword(inputValue);
        setPasswordValidity(isValid);
      } catch (error) {
        if (error instanceof Error) {
          setPasswordValidity(false);
          setPasswordError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handlePasswordConfirmationChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setPasswordConfirmation(inputValue);

      const passwordsMatch = password === inputValue;

      if (passwordsMatch && isPasswordValid) {
        setPasswordMatch(true);
      } else if (!isPasswordValid) {
        setPasswordMatch(false);
        setConfirmationError('Password is invalid');
      } else {
        setPasswordMatch(false);
        setConfirmationError('Passwords do not match');
      }
    },
    DEBOUNCE_TIME,
  );

  const isButtonDisabled = !(
    isEmailValid &&
    isUsernameValid &&
    isPasswordValid &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    passwordMatches
  );

  return (
    <form action="" className="auth__form">
      <AuthInput
        id="signup__email"
        name="email"
        type="email"
        label="Email"
        isRequired
        value={email}
        handleChange={handleEmailChange}
        isValid={isEmailValid}
        errorMessage={emailError}
      />

      <AuthInput
        id="signup__username"
        name="username"
        type="text"
        label="Username"
        isRequired
        minLength={6}
        maxLength={30}
        value={username}
        handleChange={handleUsernameChange}
        isValid={isUsernameValid}
        errorMessage={usernameError}
      />

      <AuthInput
        id="signup__first-name"
        name="first_name"
        type="text"
        label="First Name"
        isRequired
        minLength={1}
        value={firstName}
        isValid={firstName.length > 0}
        handleChange={handleFirstNameChange}
      />

      <AuthInput
        id="signup__last-name"
        name="last_name"
        type="text"
        label="Last Name"
        isRequired
        minLength={1}
        value={lastName}
        isValid={lastName.length > 0}
        handleChange={handleLastNameChange}
      />

      <AuthInput
        id="signup__password"
        name="password"
        type="password"
        label="Password"
        isRequired
        value={password}
        handleChange={handlePasswordChange}
        isValid={isPasswordValid}
        errorMessage={passwordError}
      />

      <AuthInput
        id="signup__password-confirmation"
        name="password_confirmation"
        type="password"
        label="Confirm Password"
        isRequired
        value={passwordConfirmation}
        handleChange={handlePasswordConfirmationChange}
        isValid={passwordMatches}
        errorMessage={confirmationError}
      />

      <button
        type="submit"
        className="auth__btn-submit"
        disabled={isButtonDisabled}
      >
        Sign up
      </button>
    </form>
  );
}
export default SignupForm;
