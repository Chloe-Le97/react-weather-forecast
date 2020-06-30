import React from "react";
import "./form.style.css";

const Form = (props) => {
  return (
    <div>
      <h3>How's the weather?</h3>
      <form onSubmit={props.loadWeather} className="form">
        <input
          value={props.input}
          type="text"
          className="input"
          placeholder="Type the city"
          name="city"
          onChange={props.handleChange}
        ></input>
        <button type="submit" className="btn1">
          Search
        </button>
        <button
          type="button"
          className="btn2"
          onClick={props.getCurrentWeather}
        >
          Current Position
        </button>
      </form>
      <div className="error">{props.error ? error() : null}</div>
    </div>
  );
};

function error() {
  return <div>Please Enter Valid City</div>;
}

export default Form;
