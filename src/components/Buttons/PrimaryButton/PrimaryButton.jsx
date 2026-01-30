import './PrimaryButton.css';

function PrimaryButton({ btnText, icon, fullWidth = false }) {
  return (
     <button className={`btn-primary ${fullWidth ? 'full-width' : ''}`}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{btnText}</span>
    </button>
  );
}

export default PrimaryButton;