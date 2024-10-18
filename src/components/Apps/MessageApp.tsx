import ConfigProvider from "../Message/ConfigProvider";
import { useMessage } from "../Message/useMessage";

function Aaa() {
  // *useMessage中通过useContext拿到MessageRef及其相关方法
  const message = useMessage();

  return (
    <button
      onClick={() => {
        message.add({
          content: "请求成功",
        });
      }}
    >
      成功
    </button>
  );
}

const MessageApp = () => {
  return (
    <ConfigProvider>
      <div>
        <Aaa></Aaa>
      </div>
    </ConfigProvider>
  );
};

export default MessageApp;
