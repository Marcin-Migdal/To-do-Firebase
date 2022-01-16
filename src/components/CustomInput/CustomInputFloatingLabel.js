import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import './CustomInput.css';

export const CustomInputFloatingLabel = ({
  error,
  placeholder,
  className = '',
  inputClassName = '',
  style,
  label,
  name,
  onChange,
  onBlur,
  value,
  handleKeyPress,
  autoComplete = 'on',
  errorLabelPosition = 'bottom',
}) => {
  const { t } = useTranslation();
  const id = `input-id-${name}`;

  return (
    <div style={style} className={`${className} custom-input`}>
      <span className="p-float-label">
        <InputText
          className={inputClassName}
          placeholder={t(placeholder)}
          id={id}
          name={name}
          value={value}
          onChange={e => onChange(e.target)}
          onBlur={target => onBlur && onBlur(target)}
          onKeyPress={handleKeyPress}
          autoComplete={autoComplete}
        />

        {!placeholder ? (
          error ? (
            <label className={`input-error-label ${errorLabelPosition}`}>{t(error)}</label>
          ) : (
            <label htmlFor={id}>{t(label)}</label>
          )
        ) : (
          error && <div className={`input-error ${errorLabelPosition}`}>{t(error)}</div>
        )}
      </span>
    </div>
  );
};
