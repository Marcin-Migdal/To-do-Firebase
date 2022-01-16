import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import './CustomInput.css';

export const CustomInput = ({
  error,
  placeholder,
  className = '',
  inputClassName = '',
  style,
  label = 'label',
  name,
  onChange,
  onBlur,
  value,
  handleKeyPress,
  labelWidth = '5rem',
  autoComplete = 'on',
  errorPosition = 'bottom',
}) => {
  const { t } = useTranslation();
  const id = `input-id-${name}`;

  return (
    <div style={style} className={`${className} custom-input no-label  ${error ? 'error' : ''}`}>
      {!placeholder ? (
        <>
          <label style={{ width: labelWidth }} className="label" htmlFor={id}>
            {t(label)}
          </label>
          {error && <label className={`input-error bottom`}>{t(error)}</label>}
        </>
      ) : (
        error && <label className={`input-error ${errorPosition}`}>{t(error)}</label>
      )}

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
    </div>
  );
};
