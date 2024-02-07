import { Link } from "react-router-dom";

export const NavigationLink = (props) => {
  const buttonStyles = {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "15px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    marginRight: "5px",
    background: props.bg,
    color: props.textColor,
    border: props.border,
  };

  return (
    <Link onClick={props.onClick} to={props.to} style={buttonStyles}>
      {props.text}
    </Link>
  );
};
