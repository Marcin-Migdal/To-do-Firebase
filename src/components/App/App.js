import { useTranslation } from 'react-i18next';
import styles from './App.module.css';

export const App = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <p>{t('Welcome to web application called To-do')}</p>
    </div>
  );
};
