import React from "react";
import "./CustomInput.css";

function CustomInput({ type, value, onblur, onchange, label, name, error }) {
  return (
    <>
      <div className="common-input-box">
        <input
          type={type}
          required
          className="common-input"
          name={name}
          value={value}
          onChange={onchange}
          onBlur={onblur}
        />
        <label htmlFor="">{label}</label>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}

export default CustomInput;
