import React, { forwardRef } from "react";
import IconComp, { IconProps } from ".";

interface CreateIconOptions {
  content: React.ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
}

const createIcon = (options: CreateIconOptions) => {
  const { content, iconProps = {}, viewBox = "0 0 1024 1024" } = options;

  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <IconComp ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </IconComp>
    );
  });
};

export default createIcon;
