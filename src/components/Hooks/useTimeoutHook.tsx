import React, { useState } from "react";
import { useTimeout } from "ahooks";

const Timeout = () => {
  const [state, setState] = useState(1);
  useTimeout(() => {
    setState(state + 1);
  }, 1000);

  return <div>{state}</div>;
};

export default Timeout;
