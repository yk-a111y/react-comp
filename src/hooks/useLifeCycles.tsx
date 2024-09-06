import { useEffect } from "react";

const useLifeCycles = (mount: Function, unmount?: Function) => {
  // 通过useEffect模拟挂载和卸载
  useEffect(() => {
    if (mount) {
      mount();
    }

    return () => {
      unmount && unmount();
    };
  }, []);
};

export default useLifeCycles;
