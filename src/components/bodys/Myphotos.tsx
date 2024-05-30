import { Button } from "react-bootstrap";
import MyModal from "../MyModal";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { modalActions } from "../../store/modal";

function MyPhotos(): React.ReactElement {
  const [userImgs, setUserImgs] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const getImg = async () => {
      try {
        const result = await axios.get(
          process.env.REACT_APP_SERVER_ADRESS + "/img/loadimg",
          { withCredentials: true }
        );
        if (result.status === 200) {
          setUserImgs(result.data.imgs);
        }
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          dispatch(modalActions.setHeaderMessage("토큰이 만료되었습니다"));
          dispatch(modalActions.setBodyMessage("다시 로그인 후 시도해 주세요"));
          dispatch(userActions.logout());
          dispatch(modalActions.setConfirmFn("to_home"));
          dispatch(modalActions.open());
        } else if (err.response && err.response.status === 404) {
          navigate("/404");
        } else if (err.response && err.response.status === 500) {
          navigate("/500");
        }
      }
    };
    getImg();
  }, [refresh]);

  const hadleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.value);
    try {
      const result = await axios.delete(
        process.env.REACT_APP_SERVER_ADRESS + "/img/deleteimg",
        {
          data: { imgid: e.currentTarget.value },
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        setRefresh(!refresh);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(modalActions.setHeaderMessage("토큰이 만료되었습니다"));
        dispatch(modalActions.setBodyMessage("다시 로그인 후 시도해 주세요"));
        dispatch(userActions.logout());
        dispatch(modalActions.setConfirmFn("to_home"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 406) {
        dispatch(modalActions.setHeaderMessage("이미지 ID가 잘못되었습니다"));
        dispatch(modalActions.setBodyMessage("관리자에게 문의해 주세요"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 403) {
        dispatch(modalActions.setHeaderMessage("본인의 이미지가 아닙니다"));
        dispatch(
          modalActions.setBodyMessage("본인의 이미지만 삭제할 수 있습니다")
        );
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    }
  };

  const handleDownload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      const response = await axios.get(e.currentTarget.value, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "downloaded_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl md:mt-8 text-white md:text-4xl">
          저장한 이미지를 다운받을 수 있습니다
        </div>
        <div className="text-base py-2 text-gray-lv2 md:text-xl">
          이미지를 최대 4장까지 저장할 수 있어요
        </div>
      </div>
      <div className="bg-gray-lv1 h-3/4  px-10 overflow-auto justify-center grid gap-y-4 grid-cols-1 md:h-3/5 md:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center">
        {userImgs.map((el: any) => {
          return (
            <div
              key={el.id}
              className="w-48 h-96 my-2 relative rounded overflow-hidden"
            >
              <img
                className="h-full"
                src={process.env.REACT_APP_SERVER_ADRESS + "/" + el.filepath}
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex">
                <Button
                  value={el.id}
                  className="mx-1.5"
                  style={{
                    fontSize: "0.7rem",
                    width: "4rem",
                    height: "2rem",
                  }}
                  variant="secondary"
                  onClick={hadleDelete}
                >
                  삭제
                </Button>
                <Button
                  className="mx-1.5"
                  value={
                    process.env.REACT_APP_SERVER_ADRESS + "/" + el.filepath
                  }
                  style={{
                    fontSize: "0.7rem",
                    width: "4rem",
                    height: "2rem",
                    padding: "0px",
                  }}
                  variant="secondary"
                  onClick={handleDownload}
                >
                  다운로드
                </Button>
              </div>
            </div>
          );
        })}
        {Array.from({ length: 4 - userImgs.length }).map((_, idx) => {
          return (
            <div
              key={"dummy" + idx}
              className="w-48 h-96 my-2 border-dashed border-2 border-gray-600 rounded flex items-center justify-center relative"
            >
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 mb-8 text-gray-600">
                  이미지를 저장해 보세요
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <MyModal />
    </div>
  );
}

export default MyPhotos;
