import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import cs from "classnames";
import "./index.less";

interface PortalProps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

const getAttach = (attach: PortalProps["attach"]) => {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  } else if (
    typeof attach === "object" &&
    attach instanceof window.HTMLElement
  ) {
    return attach;
  }

  return document.body;
};

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;

  // Portal组件的container元素
  const container = useMemo(() => {
    const el = document.createElement("div");
    el.className = "portal-wrapper";
    return el;
  }, []);

  useEffect(() => {
    const parent = getAttach(attach);
    parent?.appendChild(container);

    return () => {
      parent?.removeChild(container);
    };
  }, [container, attach]);

  // useImperativeHandle可以让父组件通过ref.current访问到Portal的container元素
  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Portal;
