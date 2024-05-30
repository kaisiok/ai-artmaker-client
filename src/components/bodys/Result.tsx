import { Button, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import MyModal from "../MyModal";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { selectImg, imgActions } from "../../store/img";
import { selectModal, modalActions } from "../../store/modal";

function Result(): React.ReactElement {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsSaved(false);
      setIsLoading(false);
    };
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const imgSrc = useAppSelector(selectImg).img;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "image.png";
    link.click();
  };

  const handleSaveImg = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        process.env.REACT_APP_SERVER_ADRESS + "/img/saveimg",
        { imgdata: imgSrc },
        { withCredentials: true }
      );
      if (result.status === 200) {
        setIsSaved(true);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(modalActions.setHeaderMessage("토큰이 만료되었습니다"));
        dispatch(modalActions.setBodyMessage("다시 로그인 후 시도해 주세요"));
        dispatch(userActions.logout());
        dispatch(modalActions.setConfirmFn("to_home"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 406) {
        dispatch(modalActions.setHeaderMessage("4장까지만 저장할 수 있습니다"));
        dispatch(
          modalActions.setBodyMessage("이미지를 삭제하고 다시 시도해 주세요")
        );
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-8 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          {imgSrc === "defaultimg" ? (
            <div className="w-full flex justify-center">
              <div className="w-custom-w h-custom-h my-2 border-dashed border-2 border-gray-600 rounded flex items-center justify-center relative">
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
                    이미지를 만들어 보세요
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <img
              id="ai-img"
              src={imgSrc}
              className={
                "h-custom-h w-custom-w mx-auto rounded overflow-hidden"
              }
            />
          )}
          <div id="button-wrappe1" className="h-10 flex justify-center mt-3">
            <Button
              className="mx-2"
              style={{ width: "8rem" }}
              onClick={() => {
                navigate("/");
              }}
              variant="secondary"
              type="submit"
            >
              뒤로 가기
            </Button>
            {!user.isLogin ? (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="button-tooltip">
                    로그인 후 이용할 수 있습니다
                  </Tooltip>
                }
              >
                <Button
                  className="mx-2"
                  style={{ width: "8rem" }}
                  variant="secondary"
                >
                  저장
                </Button>
              </OverlayTrigger>
            ) : isLoading ? (
              <Button
                variant="primary"
                className="mx-2"
                style={{ width: "8rem" }}
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            ) : isSaved ? (
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                variant="primary"
                disabled
              >
                저장완료
              </Button>
            ) : (
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleSaveImg}
                variant="primary"
                type="submit"
              >
                저장
              </Button>
            )}
          </div>
          <div id="button-wrappe1" className="h-10 flex justify-center mt-3">
            <Button
              className="mx-2"
              style={{ width: "17rem" }}
              onClick={downloadImage}
              variant="primary"
              type="submit"
            >
              다운로드
            </Button>
          </div>
        </div>
      </div>
      <MyModal />
    </div>
  );
}

export default Result;
