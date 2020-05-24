import React from "react";
import ReactDOM from "react-dom";
import Router from './api/views/helpers/Router';

ReactDOM.hydrate(<Router />, document.getElementById("root"));
