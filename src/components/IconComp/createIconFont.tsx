import React, { forwardRef } from "react";
import IconComp, { IconProps } from ".";

const loadedSet = new Set<string>();

export default function createIconFont(scriptUrl: string) {
  if (
    typeof scriptUrl === "string" &&
    scriptUrl.length > 0 &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl);
  }

  const IconFont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <IconComp {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </IconComp>
    );
  });

  return IconFont;
}
