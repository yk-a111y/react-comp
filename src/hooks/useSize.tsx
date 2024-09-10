import { RefObject, useState, useEffect } from "react";

type Size = {
  width: number;
  height: number;
};

const useSize = (targetRef: RefObject<HTMLElement>): Size | undefined => {
  const [size, setSize] = useState<Size | undefined>(() => {
    const el = targetRef.current;
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  useEffect(() => {
    if (targetRef.current) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setSize({ width: clientWidth, height: clientHeight });
        });
      });

      observer.observe(targetRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return size;
};

export default useSize;
