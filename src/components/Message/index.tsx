import {
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import useStore from "./useStore";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.less";
import { createPortal } from "react-dom";
import useTimer from "./useTimer";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
  onClose?: (...args: any) => void;
}

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  update: (id: number, messageProps: MessageProps) => void;
  remove: (id: number) => void;
  clearAll: () => void;
}

const Message = forwardRef<MessageRef, {}>((props, ref) => {
  const { messageList, add, update, remove, clearAll } = useStore("top");

  // useEffect(() => {
  //   add({
  //     content: Math.random().toString().slice(2, 8),
  //   });
  // }, []);

  // 把API通过ref形式暴露出去
  // useImperativeHandle(ref, () => {
  //   return {
  //     add,
  //     update,
  //     remove,
  //     clearAll,
  //   };
  // }, []);
  if ("current" in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll,
    };
  }

  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {positions.map((direction) => {
        return (
          <TransitionGroup
            className={`message-wrapper-${direction}`}
            key={direction}
          >
            {messageList[direction].map((item) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames="message"
                >
                  <MessageItem onClose={remove} {...item} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );

  // *将Message挂载到body下的wrapper中
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;

    document.body.appendChild(el);
    return el;
  }, []);

  // messageWrapper挂载到el容器下
  return createPortal(messageWrapper, el);
});

const MessageItem: FC<MessageProps> = (item) => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!,
  });
  return (
    <div
      className="message-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {item.content}
    </div>
  );
};

export default Message;
