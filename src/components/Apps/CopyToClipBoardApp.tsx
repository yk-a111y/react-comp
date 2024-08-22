import CopyToClipBoard from "../copyToClipBoard";

const copyToClipBoardApp = () => {
  return (
    <div>
      <CopyToClipBoard
        text={"clipBoard测试"}
        onCopy={(text, res) => {
          console.log("🚀 ~ copyToClipBoardApp ~ text:", text);
          console.log("🚀 ~ copyToClipBoardApp ~ res:", res);
        }}
      >
        <div>复制</div>
      </CopyToClipBoard>
    </div>
  );
};

export default copyToClipBoardApp;
