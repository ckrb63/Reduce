import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

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
  if (action.type === "INPUT_PASSWORD") {
    return {
      value: action.value,
      isvalid: action.value.trim().length > 6,
    };
  }
  if (action.type == "VALID_CHECK") {
    return {
      value: state.value,
      isvalid: state.value.trim().length > 6,
    };
  }
  return { value: "", isvalid: false };
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
    value: "",
    isvalid: null,
  });
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isvalid && passwordState.isvalid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isvalid, passwordState.isvalid]);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "INPUT_EMAIL", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "INPUT_PASSWORD", value: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    emailDispatch({
      type: "VALID_CHECK",
    });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "VALID_CHECK", isvalid: emailState.isvalid });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-Mail"
          type="email"
          inputState={emailState}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          label="Password"
          type="password"
          inputState={passwordState}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
