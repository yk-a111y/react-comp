import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "@/components/Apps/CalendarApp";
import IconCompApp from "@/components/Apps/IconCompApp";
import SpaceApp from "@/components/Apps/SpaceApp";
import PortalApp from "@/components/Apps/PortalApp";
import MutationObserverApp from "@/components/Apps/MutationObserverApp";
import CopyToClipBoardApp from "@/components/Apps/CopyToClipBoardApp";
import WaterMarkApp from "@/components/Apps/WaterMarkApp";
import LazyLoadApp from "@/components/Apps/LazyLoadApp";
import MessageApp from "@/components/Apps/MessageApp";
import HooksApp from "@/components/Apps/HooksApp"; // Hooks相关
import AnimationApp from "@/components/Apps/AnimationApp"; // 动画相关
import OnBoardingApp from "@/components/Apps/OnBoardingApp"; // 动画相关

// service worker
window.addEventListener('load', () => {
  navigator.serviceWorker
      .register('/serviceWorker.js')
      .then(async registration => {
        // 等待 Service Worker 准备好
        const readySW = await navigator.serviceWorker.ready;
        const activeWorker = readySW.active;
        // 发送消息到 Service Worker
        activeWorker?.postMessage({ 
          type: 'INIT', 
          message: 'Hello from main thread!' 
        });
        // 监听来自 Service Worker 的消息
        navigator.serviceWorker.addEventListener('message', event => {
          console.log('Received message from Service Worker:', event.data);
        });
        console.log('Service Worker active:', activeWorker);
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
          console.error('Service Worker registration failed:', error);
      });
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<CalendarApp />);
