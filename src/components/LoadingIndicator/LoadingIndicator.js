export const LoadingIndicator = ({ style = { height: '100%', fontSize: '2em' } }) => {
  return (
    <div className="loading-indicator-container" style={style}>
      <i className="pi pi-spin pi-spinner" style={{ fontSize: 'inherit' }}></i>
    </div>
  );
};
