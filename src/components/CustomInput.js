const CustomInput = ({ title, state, setState, textArea }) => {
  return (
    <div>
      <label htmlFor={title}>{title} </label>
      {textArea ? (
        <textarea
          id={title}
          cols="30"
          rows="10"
          onChange={(event) => {
            setState(event.target.value);
          }}
        ></textarea>
      ) : (
        <input
          value={state}
          type="text"
          id={title}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
      )}
    </div>
  );
};
export default CustomInput;
