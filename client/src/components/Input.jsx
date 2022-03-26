import React from "react";

const Input = ({name, setData, error}) => {
  if (name === "sprites") error[name] = false;
  return (
    <div className="input-container">
      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      <input
        className={error[name] ? "error" : ""}
        type={name === "name" || name === "sprites" ? "text" : "number"}
        name={name}
        placeholder={error[name] ? "Required" : ""}
        onChange={setData}
        max={150}
        maxLength={name === "sprites" ? "" : 10}
      />
      {error[name] && <span>&#9888;</span>}
    </div>
  );
};

export default Input;
