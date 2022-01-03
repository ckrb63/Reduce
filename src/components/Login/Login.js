import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_EMAIL") {
    return {
      value: action.value,
      isvalid: action.value.includes("@"),
    };
  }
  if (action.type === "VALID_CHECK") {
    return {
      value: state.value,
      isvalid: state.value.includes("@"),
    };
  }
  return { value: "", isvalid: false };
};

const passwordReducer = (state, action) => {
  if(action.type === 'INPUT_PASSWORD') {
    return {
      value : action.value,
      isvalid : state.value.trim().length > 6 
    };
  }
  if(action.type == 'VALID_CHECK'){
    console.log(state.value.trim().length);
    return {
      value : state.value,
      isvalid : state.value.trim().length > 6 
    }
  }
  return { value: "", isvalid: false};
};

const Login = (props) => {
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value : '',
    isvalid : null
  })
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //     console.log("check");
  //   }, 500);
  //   return () => {
  //     clearTimeout(identifier);
  //     console.log("wait...");
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "INPUT_EMAIL", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({type: "INPUT_PASSWORD", value: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.value.includes("@")
    );
  };

  const validateEmailHandler = () => {
    emailDispatch({
      type: "VALID_CHECK",
    });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({type: "VALID_CHECK", isvalid: emailState.isvalid});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
