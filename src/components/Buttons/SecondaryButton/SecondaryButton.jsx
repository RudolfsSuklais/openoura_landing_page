import './SecondaryButton.css';

function SecondaryButton({ btnText, icon, fullWidth = false }) {
  return (
      <button className={`btn-secondary ${fullWidth ? 'full-width' : ''}`}>
           {btnText}
          {icon && <span className="btn-icon">{icon}</span>}
   
    </button>
  );
}

export default SecondaryButton;