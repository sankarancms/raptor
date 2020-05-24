import React from "react";
import ReactDOM from "react-dom";
import Client from './api/helpers/Client';

ReactDOM.hydrate(<Client />, document.getElementById("root"));
