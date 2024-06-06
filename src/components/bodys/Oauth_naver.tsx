import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import api from "../Api";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store/user";

function Oauth_naver(): React.ReactElement {
  const query = useLocation().search;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const oauthLoginFn = async () => {
      try {
        const result = await api.get("/user/login/navercallback" + query);
        if (result.status === 200) {
          dispatch(userActions.login());
          dispatch(userActions.setUserId(result.data.username));
          dispatch(userActions.setSocialLogin("naver"));
          api.defaults.headers["Authorization"] = `Bearer ${result.data.token}`;
          localStorage.setItem("authToken", result.data.token);
          navigate("/");
        }
      } catch (err: any) {
        if (err.response && err.response.status === 404) {
          navigate("/404");
        } else if (err.response && err.response.status === 500) {
          navigate("/500");
        } else {
          console.log(err);
        }
      }
    };
    oauthLoginFn();
  }, []);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white px-10 pt-40 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3"></div>
      </div>
    </div>
  );
}

export default Oauth_naver;
