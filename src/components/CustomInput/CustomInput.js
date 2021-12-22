import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import './CustomInput.css';

export const CustomInput = ({
  floatingLabel = false,
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
  labelWidth = '5rem',
  autoComplete = 'on',
}) => {
  const { t } = useTranslation();
  const id = `input-id-${name}`;
  const input = (
    <InputText
      className={inputClassName}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={e => onChange(e.target)}
      onBlur={target => onBlur && onBlur(target)}
      onKeyPress={handleKeyPress}
      autoComplete={autoComplete}
    />
  );

  return (
    <>
      {floatingLabel ? (
        <div style={style} className={`${className} custom-input`}>
          <span className={`${floatingLabel ? 'p-float-label' : ''}`}>
            {input}
            {!placeholder && <label htmlFor={id}>{t(label)}</label>}
          </span>
        </div>
      ) : (
        <div style={style} className={`${className} custom-input no-label`}>
          {!placeholder && (
            <label style={{ width: labelWidth }} className="label" htmlFor={id}>
              {t(label)}
            </label>
          )}
          {input}
        </div>
      )}
    </>
  );
};
