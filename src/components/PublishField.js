import React from "react";
import "../styles/components/PublishField.css";

const PublishField = ({
  title,
  state,
  setState,
  textArea,
  isLastField,
  placeholder,
}) => {
  return (
    <div
      className={`publish-field-wrapper ${isLastField && "publish-no-border"}`}
    >
      <div className="publish-field-content">
        <label htmlFor={title}>{title} </label>
        {textArea ? (
          <textarea
            placeholder={placeholder}
            id={title}
            cols="30"
            rows="10"
            onChange={(event) => {
              setState(event.target.value);
            }}
          ></textarea>
        ) : (
          <input
            placeholder={placeholder}
            value={state}
            type="text"
            id={title}
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default PublishField;
