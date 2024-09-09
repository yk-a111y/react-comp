import { useEffect } from "react";
import useCookie from "@/hooks/useCookie";

const CookieHook = () => {
  const [value, updateCookie, deleteCookie] = useCookie("test");

  useEffect(() => {
    deleteCookie();
  }, []);

  const updateCookieHandler = () => {
    updateCookie("test2");
  };

  return (
    <div>
      <p>cookie 值: {value}</p>
      <button onClick={updateCookieHandler}>更新 Cookie</button>
      <br />
      <button onClick={deleteCookie}>删除 Cookie</button>
    </div>
  );
};

export default CookieHook;
