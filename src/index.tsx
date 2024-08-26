import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "@/components/Apps/CalendarApp";
import IconCompApp from "@/components/Apps/IconCompApp";
import SpaceApp from "@/components/Apps/SpaceApp";
import PortalApp from "@/components/Apps/PortalApp";
import MutationObserverApp from "@/components/Apps/MutationObserverApp";
import CopyToClipBoardApp from "@/components/Apps/CopyToClipBoardApp";
import WaterMarkApp from "@/components/Apps/WaterMarkApp";
import LazyLoadApp from "@/components/Apps/LazyLoadApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<LazyLoadApp />);
