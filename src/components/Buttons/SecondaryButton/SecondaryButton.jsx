import "./SecondaryButton.css";

function SecondaryButton({ btnText, icon, fullWidth = false, onClick }) {
  return (
    <button
      className={`btn-secondary ${fullWidth ? "full-width" : ""}`}
      onClick={onClick}
    >
      {btnText}
      {icon && <span className="btn-icon">{icon}</span>}
    </button>
  );
}

export default SecondaryButton;
