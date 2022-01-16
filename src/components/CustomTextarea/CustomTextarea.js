import { InputTextarea } from 'primereact/inputtextarea';
import { useTranslation } from 'react-i18next';

import './CustomTextarea.css';

export const CustomTextarea = ({
  rows = 2,
  name,
  label,
  placeholder,
  value,
  onChange,
  onKeyPress,
  disabled,
  className,
  autoResize,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${className} textarea-position-container`}>
      {label && <label>{t(label)}</label>}
      <InputTextarea
        rows={rows}
        name={name}
        placeholder={t(placeholder)}
        value={value}
        onChange={e => onChange(e.target)}
        onKeyPress={onKeyPress}
        disabled={disabled}
        className="custom-textarea"
        autoResize={autoResize}
      />
      {error && <label className="textarea-input-error">{t(error)}</label>}
    </div>
  );
};
