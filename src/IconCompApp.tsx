import IconComp from "./components/IconComp";
import createIconFont from "./components/IconComp/createIconFont";
import { IconAdd } from "./components/IconComp/icons/IconAdd";
import { IconEmail } from "./components/IconComp/icons/IconEmail";

const Test = createIconFont("//at.alicdn.com/t/c/font_4652658_n1ky1xlln4g.js");

function IconCompApp() {
  return (
    <div className="App">
      <IconAdd size="40px" />
      <IconEmail spin />
      <IconEmail style={{ color: "blue", fontSize: "60px" }} />
      {/* 传入IconFont格式 */}
      <Test type="icon-a-083_chaoshi" size="40px"></Test>
    </div>
  );
}

export default IconCompApp;
