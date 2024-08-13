import React, { forwardRef, PropsWithChildren } from "react";
import cs from "classnames";

import "./index.less";

type BaseIcons = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

export type IconProps = BaseIcons &
  // Omit<A, B>表示以A类型为基础，剔除B类型的属性
  Omit<React.SVGProps<SVGSVGElement>, keyof BaseIcons>; // Icon即是对svg的封装，故也接受svg的属性，透传给内部的svg

export const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || "1em";
  const height = (size as string) || "1em";

  return [width, height];
};

// forwardRef将svg的ref透传下去
const IconComp = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, size = "1em", spin, children, ...rest } = props;

    const [width, height] = getSize(size);

    const classNames = cs(
      "icon",
      {
        "icon-spin": spin,
      },
      className
    );

    return (
      <svg
        ref={ref}
        className={classNames}
        width={width}
        height={height}
        style={style}
        fill="currentColor"
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

export default IconComp;
