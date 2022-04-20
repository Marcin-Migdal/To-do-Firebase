import { MdOutlineLanguage, MdDarkMode, MdOutlineDarkMode, MdOutlineLogout, MdPeopleAlt } from 'react-icons/md';
import { RiFileHistoryFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import logo from '../../resourse/images/logo-white-no-text.svg';
import { firebaseSignOut } from 'api/userApi';
import { HelpModal } from 'components';
import { pages } from 'utils/pagesUrl';
import { useToDo } from 'context';

import './NavBar.css';

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { userConfig, toggleDarkMode, handleLanguageChange } = useToDo();
  const history = useHistory();

  const goToPage = page => {
    if (window.location.pathname === page) return;
    if (pages.mainPage && !userConfig) {
      history.push(pages.signIn);
      return;
    }
    history.push(page);
  };

  const navBarItems = [
    {
      widthClass: 'dark-mode',
      onClick: toggleDarkMode,
      Icon: userConfig?.darkMode ? MdDarkMode : MdOutlineDarkMode,
      title: t(userConfig?.darkMode ? 'Dark mode' : 'Light mode'),
    },
    {
      widthClass: 'lng',
      onClick: handleLanguageChange,
      Icon: MdOutlineLanguage,
      title: `${t('Language')}: ${i18n.language.toUpperCase()}`,
    },
    {
      widthClass: 'history',
      onClick: () => goToPage(pages.history),
      Icon: RiFileHistoryFill,
      title: t('History'),
    },
    // {
    //   widthClass: 'friends',
    //   onClick: () => goToPage(pages.friends),
    //   Icon: MdPeopleAlt,
    //   title: t('Friends'),
    // },
    {
      widthClass: 'log-out',
      onClick: () => firebaseSignOut(),
      Icon: MdOutlineLogout,
      title: t('Logout'),
    },
  ];

  return (
    <div className="nav-bar no-select">
      <div className="logo-container" onClick={() => goToPage(pages.mainPage)}>
        <img className="logo-image" src={logo} alt="Logo" />
        <p className="logo-text">To Do</p>
      </div>
      {userConfig && (
        <div className={`nav-bar-items ${i18n.language === 'pl' ? 'lng-pl' : 'lng-en'}`}>
          {navBarItems.map((item, index) => (
            <div key={index} className={`item ${item.widthClass} no-select`} onClick={item.onClick}>
              <div className="icon-container">
                <item.Icon className="icon" />
              </div>
              <p className="text">{item.title}</p>
            </div>
          ))}
          <HelpModal />
        </div>
      )}
    </div>
  );
};
