import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/poke-reducer";
import { Redirect } from "react-router-dom";

const VALID_NUMBER = 123456;

const Check = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn } = useSelector((s) => s.poke);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    localStorage.setItem("poke-token", "Good job, guys!");
    return <Redirect to="/cards/1" />;
  }

  return (
    <form
      action="#"
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (+number === VALID_NUMBER) {
          dispatch(setLoggedIn(true));
        }
        setNumber("");
        setError("Сосредоточьтесь!");
      }}
    >
      <label htmlFor="login-check" />
      <div className="form__field">
        <input
          id="login-check"
          type="name"
          name="login-check"
          placeholder="6-digit number"
          required
          value={number}
          pattern="\d{6}"
          minLength="6"
          maxLength="6"
          onChange={(e) => {
            setNumber(e.target.value);
            setError("");
          }}
        />
        <span className="form__error">поле должно содержать 6 цифр</span>
      </div>
      <button type="submit">Отправить</button>
      <p className="log-pass-error">{error}</p>
    </form>
  );
};

export default Check;
