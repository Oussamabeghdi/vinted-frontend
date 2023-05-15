import React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class SuperSimple extends React.Component {
  state = {
    values: [50],
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em",
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => this.setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  marginLeft: "80px",
                  height: "5px",
                  width: "80%",
                  borderRadius: "4px",

                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ["#2db1ba", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  // alignItems: "flex-end",
                  // alignSelf: "baseline",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "25px",
                width: "25px",
                borderRadius: "25px",
                backgroundColor: "#2db1ba",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  backgroundColor: isDragged ? "#2db1ba" : "#CCC",
                }}
              />
            </div>
          )}
        />

        <output style={{ marginTop: "30px" }} id="output">
          {this.state.values[0].toFixed(1)}
        </output>
      </div>
    );
  }
}
export default SuperSimple;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
