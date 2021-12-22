import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import './CustomButton.css';

export const CustomButton = props => {
  const { t } = useTranslation();
  const {
    className = '',
    label = '',
    onClick = undefined,
    disabled = false,
    loading = false,
    outlined = false,
    icon,
    iconPosRight = false,
    type = 'button',
    tabIndex,
  } = props;

  return (
    <Button
      tabIndex={tabIndex}
      type={type}
      className={`custom-button ${className} ${outlined ? 'p-button-outlined' : ''}`}
      label={t(label)}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      icon={icon}
      iconPos={iconPosRight}
    />
  );
};
