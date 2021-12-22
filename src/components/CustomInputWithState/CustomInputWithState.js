import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CustomInputWithState.css';

export const CustomInputWithState = ({ placeholder, className = '', label, name, onChange, onBlur, defaultValue }) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(defaultValue);

  const handleChange = target => {
    setLocalValue(target.value);
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
          value={localValue}
          onChange={e => handleChange(e.target)}
          onBlur={e => handleBlur(e.target)}
        />
        {!placeholder && <label htmlFor={name}>{t(label)}</label>}
      </span>
    </div>
  );
};
