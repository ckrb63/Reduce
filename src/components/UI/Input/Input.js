import react from "react";
import { useImperativeHandle, useRef } from "react/cjs/react.development";
import classes from "./Input.module.css";

const Input = react.forwardRef((props, ref) => {
  const userInput = useRef();
  const focusInput = () => {
    userInput.current.focus();
  }

  useImperativeHandle(ref ,()=>{
    return {
      activate : focusInput
    };
  })
    return <div
      className={`${classes.control} ${
        props.inputState.isvalid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.type}>{props.label}</label>
      <input
        ref={userInput}
        type={props.type}
        id={props.type}
        value={props.inputState.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  
});
export default Input;
