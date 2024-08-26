import { lazy } from "react";
import LazyLoad from "../LazyLoad/index";
// import LazyLoad from "react-lazyload";

const LazyKai = lazy(() => import("../LazyLoad/Kai"));

const LazyLoadApp = () => {
  return (
    // LazyLoad用法演示
    <div>
      <div className="box" style={{ height: "800px" }}></div>
      <LazyLoad placeholder="loading">
        <img src="https://p5.img.cctvpic.com/photoworkspace/contentimg/2023/03/30/2023033011303020756.jpg"></img>
      </LazyLoad>
      <LazyLoad
        placeholder="loading2"
        onContentVisible={() => {
          console.log("onContentVisible");
        }}
      >
        <LazyKai />
        <img src="https://images.pexels.com/photos/26045508/pexels-photo-26045508.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"></img>
        <img src="https://images.pexels.com/photos/26690029/pexels-photo-26690029.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"></img>
      </LazyLoad>
    </div>
  );
};

export default LazyLoadApp;
