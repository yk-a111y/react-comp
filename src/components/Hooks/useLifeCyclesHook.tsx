import { useEffect, useState } from "react";
import useLifeCycles from "@/hooks/useLifeCycles";

const LifeCyclesHook = () => {
  useLifeCycles(
    () => console.log("componentDidMount"),
    () => console.log("componentDidUnMount")
  );

  return <div>LifeCyclesHook</div>;
};

export default LifeCyclesHook;
