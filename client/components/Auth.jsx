"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useCookies } from "react-cookie";

// this is for protected route functionality. it checks if the user is authenticated or not. if it is authenticated he can access the todo route otherwise it will redirect him to login page

export default function isAuth(Component) {
  const [cookies, setCookie, removeCookie] = useCookies(["todoAuthToken"]);

  return function IsAuth(props) {
    const auth = cookies.todoAuthToken;

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
