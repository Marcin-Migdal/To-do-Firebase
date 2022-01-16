import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CustomInputWithState.css';

export const CustomInputWithState = ({
  type,
  placeholder,
  className = '',
  label,
  name,
  onChange,
  onBlur,
  defaultValue,
  handleKeyPress,
  error,
  errorPosition = 'bottom',
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const handleChange = target => {
    setValue(target.value);
    onChange && onChange(target);
  };

  const handleBlur = target => {
    onBlur && onBlur(target);
  };

  return (
    <div className={`${className} custom-input-with-state ${error ? 'error' : ''}`}>
      <span className="p-float-label">
        <InputText
          type={type}
          placeholder={t(placeholder)}
          id={name}
          name={name}
          value={value || ''}
          onChange={e => handleChange(e.target)}
          onBlur={e => handleBlur(e.target)}
          onKeyPress={handleKeyPress}
        />
        {!placeholder ? (
          error ? (
            <label className="input-error-label">{t(error)}</label>
          ) : (
            <label htmlFor={name}>{t(label)}</label>
          )
        ) : (
          error && <div className={`input-error ${errorPosition}`}>{t(error)}</div>
        )}
      </span>
    </div>
  );
};
