import { RefObject, useState, useEffect } from "react";

const useScrolling = (ref: RefObject<HTMLElement>): boolean => {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      let scrollTimer: number;

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          setScrolling(false);
        }, 150);
      };

      // Hook接收Ref，并监听Ref的scroll事件；
      // ! 这种Hook绑定方法与useHover中的绑定方法不一致，useHover是通过cloneElement为元素添加事件，但这样会覆盖原事件，所以在useHover中，我们需要首先执行一下原事件
      ref.current.addEventListener("scroll", () => {
        handleScroll();
      });

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("scroll", () => {
            handleScroll();
          });
        }
      };
    }

    return () => {};
  }, [ref]);

  return scrolling;
};

export default useScrolling;
