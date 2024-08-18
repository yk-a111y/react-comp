import React from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "@/components/Apps/CalendarApp";
import IconCompApp from "@/components/Apps/IconCompApp";
import SpaceApp from "@/components/Apps/SpaceApp";
import PortalApp from "@/components/Apps/PortalApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<PortalApp />);
