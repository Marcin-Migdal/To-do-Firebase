import './CustomIcon.css';

export const CustomIcon = ({ src, className = '', emptyPlaceholder }) =>
  src ? (
    <img className={`${className} default-icon`} src={src} alt="icon" />
  ) : (
    <div className={`${className} default-icon`}>
      <p className="no-select">{emptyPlaceholder[0]}</p>
    </div>
  );
