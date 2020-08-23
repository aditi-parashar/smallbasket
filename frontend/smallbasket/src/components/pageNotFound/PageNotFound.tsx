import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h3>Oops! Page not found.</h3>
      <Link to="/" className="btn btn-primary btn-lg">
        Go to Home
      </Link>
    </>
  );
};

export default PageNotFound;
