import ConfigProvider from "../Message/ConfigProvider";
import { useMessage } from "../Message/useMessage";
import Queue from "../../utils/Queue";
import { useEffect } from "react";

function Aaa() {
  // *useMessage中通过useContext拿到MessageRef及其相关方法
  const message = useMessage();

  useEffect(() => {
    const queue = new Queue();
    queue.enqueue("1");
    queue.enqueue("2");
    queue.enqueue("3");
    console.log(queue);

    // for (const value of queue) {
    //   console.log(value); // 输出 1, 2, 3
    // }

    queue.dequeue();
    queue.dequeue();
    console.log(queue);
  }, []);

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
