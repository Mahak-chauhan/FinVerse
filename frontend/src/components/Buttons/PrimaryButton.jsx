const PrimaryButton = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button type={type} className={`btn-gradient btn ${className}`} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
