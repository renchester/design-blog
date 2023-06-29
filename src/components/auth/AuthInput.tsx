import './AuthInput.scss';

type AuthInputProps = {
  id: string;
  type: string;
  name: string;
  label: string;
  value: string;
  isValid?: boolean;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
};

function AuthInput(props: AuthInputProps) {
  const {
    id,
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
    isValid,
    errorMessage,
    minLength,
    maxLength,
    isRequired,
  } = props;

  return (
    <div className="auth-input">
      <label htmlFor={id} className="auth-input__label">
        {label}
      </label>
      <div className="auth-input__input-wrapper">
        <input
          id={id}
          type={type}
          name={name}
          className="auth-input__input"
          onChange={handleChange}
          placeholder={placeholder || ''}
          required={isRequired || false}
          minLength={minLength || -1}
          maxLength={maxLength || -1}
        />
        {/* Display validation status as icons */}
        {value.length > 0 &&
          isValid !== undefined &&
          (isValid ? (
            <div className="auth-validation" aria-label={`${label} is valid`}>
              <svg
                className="auth-validation__icon auth-validation__valid-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          ) : (
            <div className="auth-validation" aria-label={`${label} is invalid`}>
              <svg
                className="auth-validation__icon auth-validation__invalid-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          ))}
      </div>

      {/* Display error messages if there are any */}
      {errorMessage && !isValid && value.length > 0 && (
        <p className="auth-input__error">{errorMessage}</p>
      )}
    </div>
  );
}

export default AuthInput;
