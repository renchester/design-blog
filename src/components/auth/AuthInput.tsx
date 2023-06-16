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
              <i className="material-symbols-outlined auth-validation__icon auth-validation__valid-icon">
                check
              </i>
            </div>
          ) : (
            <div className="auth-validation" aria-label={`${label} is invalid`}>
              <i className="material-symbols-outlined auth-validation__icon auth-validation__invalid-icon">
                close
              </i>
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
