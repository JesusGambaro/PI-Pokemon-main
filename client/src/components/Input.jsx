import React from "react";

const Input = ({name, setData}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
      onChange={setData}
    />
  );
};

export default Input;
