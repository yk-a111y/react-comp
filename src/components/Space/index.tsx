import React, { useContext, useMemo } from "react";
import cs from "classnames";
import { ConfigContext } from "./ConfigContext";
import "./index.less";

export type SizeType = "small" | "middle" | "large" | number | undefined;

// 继承HTMLDivElement的属性，使得组件使用起来和div标签一样
interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "vertical" | "horizontal";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const SPACE_SIZE = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? SPACE_SIZE[size] : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);
  const {
    className,
    style,
    children,
    align,
    split,
    direction = "horizontal",
    size = space?.size || "small",
    wrap = false,
    ...otherProps
  } = props;

  // cs合并类名
  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  const classNames = cs(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  // 处理样式
  const otherStyles: React.CSSProperties = {};
  const [horizontalSize, verticalSize] = useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;
  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }

  // children做toArray处理后才能像数组一样操作
  const childNodes = React.Children.toArray(children);
  const node = childNodes.map((child: any, index) => {
    const key = (child && child.key) || `space-item-${index}`;
    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {index < childNodes.length - 1 && split && (
          <span className="space-split" style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  return (
    <div
      className={classNames}
      style={{ ...style, ...otherStyles }}
      {...otherProps}
    >
      {node}
    </div>
  );
};

export default Space;
