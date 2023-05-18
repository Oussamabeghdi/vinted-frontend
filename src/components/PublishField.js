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
            className="publish-field"
            placeholder={placeholder}
            id={title}
            rows="5"
            onChange={(event) => {
              setState(event.target.value);
            }}
          ></textarea>
        ) : (
          <input
            className="publish-field"
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
