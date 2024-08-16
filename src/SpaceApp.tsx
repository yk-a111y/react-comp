import Space from "./components/Space";
import { ConfigProvider } from "./components/Space/ConfigContext";

function SpaceApp() {
  const boxStyle = {
    width: 100,
    height: 100,
    backgroundColor: "pink",
    border: "1px solid #000",
  };
  return (
    <div className="App">
      <ConfigProvider space={{ size: 10 }}>
        <Space
          split={
            <div
              className="spilt-box"
              style={{ background: "yellow", width: 100, height: 100 }}
            ></div>
          }
        >
          <div className="box" style={boxStyle}></div>
          <div className="box" style={boxStyle}></div>
          <div className="box" style={boxStyle}></div>
        </Space>
        <Space
          direction="vertical"
          split={
            <div
              className="spilt-box"
              style={{ background: "yellow", width: 100, height: 100 }}
            ></div>
          }
        >
          <div className="box" style={boxStyle}></div>
          <div className="box" style={boxStyle}></div>
          <div className="box" style={boxStyle}></div>
        </Space>
      </ConfigProvider>
    </div>
  );
}

export default SpaceApp;
