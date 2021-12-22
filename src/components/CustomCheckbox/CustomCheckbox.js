import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CustomCheckbox.css';

export const CustomCheckbox = ({ className = '', label, name, onChange, width = '100%' }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(false);

  const handleChange = e => {
    setValue(e.checked);
    onChange && onChange(e);
  };

  return (
    <div className={`${className} checkbox-input-container`} style={{ width: width }}>
      <label htmlFor={name} className="p-checkbox-label">
        {t(label)}
      </label>
      <Checkbox id={name} name={name} onChange={handleChange} checked={value} />
    </div>
  );
};
