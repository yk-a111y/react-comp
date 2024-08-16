import React from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "./CalendarApp";
import IconCompApp from "./IconCompApp";
import SpaceApp from "./SpaceApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<SpaceApp />);
