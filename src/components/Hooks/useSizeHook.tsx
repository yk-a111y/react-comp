import React, { useRef } from "react";
// import { useSize } from "ahooks";
import useSize from "../../hooks/useSize";

const SizeHook = () => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  return (
    <div ref={ref}>
      <p>改变窗口大小试试</p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};

export default SizeHook;
