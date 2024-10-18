import ConfigProvider from "../Message/ConfigProvider";
import { useMessage } from "../Message/useMessage";

function Aaa() {
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
