import "./SecondaryButton.css";

function SecondaryButton({ btnText, icon, fullWidth = false, onClick }) {
  return (
    <button
      className={`btn-secondary ${fullWidth ? "full-width" : ""}`}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {btnText}

    </button>
  );
}

export default SecondaryButton;
