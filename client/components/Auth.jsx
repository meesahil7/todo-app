"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from "universal-cookie";

// this is for protected route functionality. it checks if the user is authenticated or not. if it is authenticated he can access the todo route otherwise it will redirect him to login page

export default function isAuth(Component) {
  const cookies = new Cookies(null, { path: "/" });

  return function IsAuth(props) {
    const auth = cookies.get("todoAuthToken");

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
