import React from "react";
import "./CustomInput.css";

function CustomInput({ type, value, onblur, onchange, label, name, error, fileInputRef, imageChange, selectedImage }) {
  return (
    <>
      <div className="common-input-box">
      {type === 'textarea' ? (
      <textarea
          required
          className="common-input"
          name={name}
          value={value}
          onChange={onchange}
          onBlur={onblur}
        />)
        : type === 'file' ? (
          <>
            <label htmlFor={name} style={{ marginTop: "34px" }}>{label}</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={imageChange}
              style={{ display: "none" }}
              name={name}
            />
           <div className="upload-icon">
            <img
              src={value || "@assets/add_icon.svg"} // Default add icon
              alt=""
              width={"80px"}
              height={"76px"}
              onClick={() => fileInputRef.current.click()}
            
            /></div>
            {selectedImage && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "37px", marginBottom: "20px" }}>
                <img src={selectedImage} alt="Selected" style={{ width: "28%", height: "80%" }} />
              </div>
            )}
          </>
        ) 
        :(<input
          type={type}
          required
          className="common-input"
          name={name}
          value={value}
          onChange={onchange}
          onBlur={onblur}
        />)
        }

        <label htmlFor="">{label}</label>
        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}

export default CustomInput;
