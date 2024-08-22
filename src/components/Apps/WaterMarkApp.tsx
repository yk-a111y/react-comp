import WaterMark from "../WaterMark";

const WaterMaarkApp = () => {
  return (
    <WaterMark content={["测试水印"]}>
      <div style={{ height: 200 }}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
          deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
          recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet,
          id provident!
        </p>
      </div>
    </WaterMark>
  );
};

export default WaterMaarkApp;
