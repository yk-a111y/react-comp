import { useEffect, useState } from "react";
import useMountedState from "@/hooks/useMountedState";

const MountedStateHook = () => {
  const isMounted = useMountedState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  return <div>{isMounted() ? "已挂载" : "pending"}</div>;
};

export default MountedStateHook;
