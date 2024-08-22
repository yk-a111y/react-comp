import {
  useRef,
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import useWaterMark from "./index.function.tsx/useWaterMark";

export interface WaterMarkProps extends PropsWithChildren {
  style?: CSSProperties;
  className?: string;
  zIndex?: number;
  width?: number;
  height?: number;
  rotate?: number;
  image?: string;
  content?: string | string[];
  fontStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  gap?: [number, number]; // 两个水印间的距离
  offset?: [number, number]; // 水印相对于容器container的偏移量
  getContainer?: () => HTMLElement | null;
}

const WaterMark: React.FC<WaterMarkProps> = (props) => {
  const {
    className,
    style,
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current;
  }, [props.getContainer, containerRef.current]);

  const { generateWaterMark } = useWaterMark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  });

  useEffect(() => {
    generateWaterMark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    });
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle), // 对象 & 数组参数，序列化后再放入deps数组
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ]);

  return props.children ? (
    <div className={className} style={style} ref={containerRef}>
      {props.children}
    </div>
  ) : null;
};

export default WaterMark;
