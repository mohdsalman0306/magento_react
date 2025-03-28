import React from "react";

const Button = ({onClick, textColor, buttonTitle, hoverColor, px, originalColor }) => {
  return (
    <button
      className={`py-2 rounded border ${originalColor} ${px} ${textColor} ${hoverColor}`}
      onClick={onClick}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
