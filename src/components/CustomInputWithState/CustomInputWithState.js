import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CustomInputWithState.css';

export const CustomInputWithState = ({ placeholder, className = '', label, name, onChange, onBlur, defaultValue, handleKeyPress }) => {
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
    <div className={`${className} custom-input-with-state`}>
      <span className="p-float-label">
        <InputText
          placeholder={placeholder}
          id={name}
          name={name}
          value={value || ''}
          onChange={e => handleChange(e.target)}
          onBlur={e => handleBlur(e.target)}
          onKeyPress={handleKeyPress}
        />
        {!placeholder && <label htmlFor={name}>{t(label)}</label>}
      </span>
    </div>
  );
};
