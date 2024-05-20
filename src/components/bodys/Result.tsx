import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function Result(): React.ReactElement {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-8 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <div
            id="ai-img"
            className={"bg-samplebg bg-cover h-custom-h w-custom-w mx-auto"}
          ></div>
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
            {user.isLogin ? (
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                // onClick={() => {
                //   navigate("/result");
                // }}
                variant="primary"
                type="submit"
              >
                저장
              </Button>
            ) : (
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
            )}
          </div>
          <div id="button-wrappe1" className="h-10 flex justify-center mt-3">
            <Button
              className="mx-2"
              style={{ width: "17rem" }}
              // onClick={() => {
              //   navigate("/result");
              // }}
              variant="primary"
              type="submit"
            >
              다운로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
