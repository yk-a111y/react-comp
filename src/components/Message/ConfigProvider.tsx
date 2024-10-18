import { PropsWithChildren, useRef, createContext, RefObject } from "react";
import Message, { MessageProps, MessageRef } from ".";

interface ConfigProviderProps {
  messageRef?: RefObject<MessageRef>;
}
// 创建Context
export const ConfigContext = createContext<ConfigProviderProps>({});

const ConfigProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const messageRef = useRef<MessageRef>(null);

  return (
    <ConfigContext.Provider value={{ messageRef }}>
      {/* Message为forwardRef包裹的组件，可以将ref向下传递，然后给ref赋予add、update等方法 */}
      <Message ref={messageRef}></Message>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
