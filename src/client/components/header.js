import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { setLoggedIn } from "../../redux/poke-reducer";
import { useDispatch } from "react-redux";

const Header = () => {
  const { pokemonId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <header>
      <div className={!pokemonId ? "back-invisible" : ""}>
        <button type="button" onClick={() => history.goBack()}>
          BACK
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(setLoggedIn(false));
          history.push("/login");
        }}
      >
        LOGOUT
      </button>
    </header>
  );
};

export default Header;
