'use client';

import './Form.scss';
import { useState } from 'react';
import debounce from 'lodash.debounce';

import AuthInput from './AuthInput';
import validateEmail from '@/utils/validators/validateEmail';
import validatePassword from '@/utils/validators/validatePassword';

function LoginForm() {
  const DEBOUNCE_TIME = 1000;

  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValidity] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordValid, setPasswordValidity] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const isButtonDisabled = !(isEmailValid && isPasswordValid);

  const handleEmailChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setEmail(inputValue);

      try {
        const validity = validateEmail(inputValue);
        setEmailValidity(validity);
      } catch (error) {
        if (error instanceof Error) {
          setEmailValidity(false);
          setEmailError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handlePasswordChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setPassword(inputValue);

      try {
        const validity = validatePassword(inputValue);
        setPasswordValidity(validity);
      } catch (error) {
        if (error instanceof Error) {
          setPasswordValidity(false);
          setPasswordError(error.message);
        }
      }
    },
    DEBOUNCE_TIME,
  );

  const handleEmailLogin = async () => {};

  return (
    <form action="" className="auth__form" onSubmit={handleEmailLogin}>
      <AuthInput
        id="login__email"
        name="email"
        type="email"
        label="Email"
        value={email}
        isRequired
        isValid={isEmailValid}
        handleChange={handleEmailChange}
        errorMessage={emailError}
      />
      <AuthInput
        id="login__password"
        name="password"
        type="password"
        label="Password"
        value={password}
        isRequired
        isValid={isPasswordValid}
        handleChange={handlePasswordChange}
        errorMessage={passwordError}
      />

      <button
        type="submit"
        className="auth__btn-submit"
        disabled={isButtonDisabled}
      >
        Log in
      </button>
    </form>
  );
}
export default LoginForm;
