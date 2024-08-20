import React, { useEffect, useLayoutEffect, useRef } from "react";

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"],
};
const useMutationObserver = (
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!nodeOrList) return;

    let instance: MutationObserver;
    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ("MutationObserver" in window) {
      instance = new (MutationObserver as any)(callback);

      nodeList.forEach((element) => {
        instance.observe(element, options);
      });
    }

    return () => {
      // 删除MutationObserver通知队列中的剩余通知
      instance?.takeRecords();
      // 组织MutationObserver实例继续接收通知
      instance?.disconnect();
    };
  }, [options, nodeOrList]);
};

export default useMutationObserver;
