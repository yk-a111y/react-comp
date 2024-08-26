import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

interface LazyLoadProps {
  className?: string;
  styles?: CSSProperties;
  width?: string | number;
  height?: string | number;
  placeholder?: ReactNode;
  offset?: number | string;
  children: ReactNode;
  onContentVisible?: () => void; // 进入可视区域的回调
}

const lazyLoad: React.FC<LazyLoadProps> = (props) => {
  const {
    className = "",
    styles,
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children,
  } = props;

  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementObserver = useRef<IntersectionObserver>();

  const lazyHandler = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setVisible(true);
      onContentVisible && onContentVisible();

      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // 当元素可见比例为0、0.25、0.5、0.75、1.0时触发回调
    };

    elementObserver.current = new IntersectionObserver(lazyHandler, options);
    const node = containerRef.current;

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }

    return () => {
      // 取消监听
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  const style = { height, width, ...styles };
  return (
    <div ref={containerRef} className={className} style={style}>
      {visible ? children : placeholder}
    </div>
  );
};

export default lazyLoad;
