import React from "react";
import {render} from "react-dom";

import Todos from "./pages/Todos";

const app = document.getElementById('app');

render(
  <Todos/>, app);
