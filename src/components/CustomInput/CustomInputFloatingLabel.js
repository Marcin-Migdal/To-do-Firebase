import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import './CustomInputFloatingLabel.css';
import { useDebounce } from 'hooks/useDebounce';

export const CustomInputFloatingLabel = props => {
  const { t } = useTranslation();
  const { inputType = 'state', error, placeholder, className = '', label, name, errorPosition = 'bottom' } = props;
  const id = `input-id-${name}`;

  return (
    <div className={`${className} custom-input ${error ? 'error' : ''}`}>
      <span className="p-float-label">
        {inputType === 'state' ? (
          <StateInput {...props} t={t} id={id} />
        ) : inputType === 'debounce-state' ? (
          <DebounceInput {...props} t={t} id={id} />
        ) : (
          <Input {...props} t={t} id={id} />
        )}

        {!placeholder ? (
          error ? (
            <label className="input-error-label">{t(error)}</label>
          ) : (
            <label htmlFor={id}>{t(label)}</label>
          )
        ) : (
          error && <div className={`input-error ${errorPosition}`}>{t(error)}</div>
        )}
      </span>
    </div>
  );
};

const StateInput = props => {
  const {
    placeholder,
    name,
    type,
    inputClassName = '',
    onChange,
    onBlur,
    value,
    handleKeyPress,
    autoComplete = 'on',
    t,
    id,
    onFocus,
  } = props;
  const [inputValue, setInputValue] = useState(value);

  const handleChange = e => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  const handleBlur = e => onBlur && onBlur(e);

  return (
    <InputText
      key={`key-${name}`}
      className={inputClassName}
      type={type}
      placeholder={t(placeholder)}
      id={id}
      name={name}
      value={inputValue || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      autoComplete={autoComplete}
      onFocus={onFocus}
    />
  );
};

const DebounceInput = props => {
  const {
    placeholder,
    name,
    type,
    inputClassName = '',
    onChange,
    onBlur,
    value,
    handleKeyPress,
    autoComplete = 'on',
    t,
    id,
    delay = 400,
    onFocus,
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [hasValueChanged, setHasValueChanged] = useState(false);

  const debounceFilter = useDebounce(inputValue, delay);

  useEffect(() => {
    hasValueChanged && onChange && onChange({ target: { value: debounceFilter, name: name } });
  }, [debounceFilter, onChange, name]);

  const handleChange = e => {
    setHasValueChanged(true);
    setInputValue(e.target.value);
  };

  const handleBlur = e => onBlur && onBlur(e);

  return (
    <InputText
      key={`key-${name}`}
      className={inputClassName}
      type={type}
      placeholder={t(placeholder)}
      id={id}
      name={name}
      value={inputValue || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      autoComplete={autoComplete}
      onFocus={onFocus}
    />
  );
};

const Input = props => {
  const {
    placeholder,
    name,
    type,
    inputClassName = '',
    onChange,
    onBlur,
    value,
    handleKeyPress,
    autoComplete = 'on',
    t,
    id,
    onFocus,
  } = props;

  return (
    <InputText
      key={`key-${name}`}
      className={inputClassName}
      type={type}
      placeholder={t(placeholder)}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={e => onBlur && onBlur(e)}
      onKeyPress={handleKeyPress}
      autoComplete={autoComplete}
      onFocus={onFocus}
    />
  );
};
