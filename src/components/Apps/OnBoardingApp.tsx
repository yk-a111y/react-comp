import { useEffect, useState } from "react";
import OnBoarding from "../OnBoarding";
import { Button, Popover } from "antd";

function OnBoardingApp() {
  return (
    <>
      <OnBoarding
        steps={[
          {
            selector: () => document.getElementById("title"),
            renderContent: (currentStep) => `Test${currentStep}`,
            placement: "bottom",
          },
          {
            selector: () => document.getElementById("content1"),
            renderContent: (currentStep) => `Test${currentStep}`,
            placement: "bottom",
          },
          {
            selector: () => document.getElementById("content2"),
            renderContent: (currentStep) => `Test${currentStep}`,
            placement: "bottom",
          },
        ]}
      />
      <h1 style={{ textAlign: "center" }} id="title">
        Title
      </h1>
      <div
        id="content1"
        style={{
          height: "200px",
          textAlign: "center",
          backgroundColor: "#eee",
        }}
      >
        <h3>内容区域1</h3>
      </div>
      <div
        id="content2"
        style={{
          height: "400px",
          textAlign: "center",
          backgroundColor: "#999",
        }}
      >
        <h3>内容区域2</h3>
      </div>
    </>
  );
}

export default OnBoardingApp;
