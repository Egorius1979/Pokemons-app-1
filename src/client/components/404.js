import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="container">
      <div>
        <h1>404</h1>
        <p>Page Not Found</p>
        <p>It looks like you found a glitch in the matrix...</p>
        <br />
        <button
          type="button"
          tabIndex="0"
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          Go to the Main Page
        </button>
      </div>
    </div>
  );
};

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
