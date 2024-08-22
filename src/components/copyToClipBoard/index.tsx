import React, {
  cloneElement,
  EventHandler,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import copy from "copy-to-clipboard";

interface CopyToClipBoardProps {
  text: string;
  onCopy?: (text: string, res: boolean) => void;
  children: ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
}

const copyToClipBoard: React.FC<CopyToClipBoardProps> = (props) => {
  const { text, onCopy, children, options } = props;

  // 断言只有唯一一个children元素
  const element = React.Children.only(children);

  function onClick(event: MouseEvent) {
    const element = React.Children.only(children);

    const res = copy(text, options);

    onCopy && onCopy(text, res);

    // 如果子元素有onClick事件，执行子元素的onClick事件
    if (typeof element?.props?.onClick === "function") {
      element.props.onClick(event);
    }
  }

  return cloneElement(element, { onClick });
};

export default copyToClipBoard;
