import { cloneElement, ReactElement, useState } from "react";

// 传入的可以是 ReactElement 也可以是返回 ReactElement 的函数
type Element = ReactElement | ((state: boolean) => ReactElement);

const useHover = (element: Element): [ReactElement, boolean] => {
  // 用 useState 保存 hover 状态
  const [state, setState] = useState(false);

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    // console.log(
    //   "🚀 ~ onMouseEnter ~ originalOnMouseEnter:",
    //   originalOnMouseEnter
    // );
    // console.log("🚀 ~ onMouseEnter ~ event:", event);
    // 传入的 React Element 本身有 onMouseEnter、onMouseLeave 的事件处理函数，要先调用下
    originalOnMouseEnter?.(event);
    setState(true);
  };

  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event);
    setState(false);
  };

  if (typeof element === "function") {
    element = element(state);
  }

  // 用 as 断言 element 是 ReactElement
  const reactEle = element as ReactElement;
  // 用 cloneElement 复制 ReactElement，给它添加 onMouseEnter、onMouseLeave 事件
  const el = cloneElement(reactEle, {
    onMouseEnter: onMouseEnter(reactEle.props.onMouseEnter),
    onMouseLeave: onMouseLeave(reactEle.props.onMouseLeave),
  });

  return [el, state];
};

export default useHover;
