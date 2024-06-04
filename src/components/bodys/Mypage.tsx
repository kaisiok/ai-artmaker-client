import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MyModal from "../MyModal";
import api from "../Api";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { modalActions } from "../../store/modal";

function Mypage(): React.ReactElement {
  const [whatTodo, setWhatTodo] = useState("nothing");
  const [userPassword, setUserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPW, setCheckNewPW] = useState("");
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleTodoDelete = () => {
    setWhatTodo("delete");
  };
  const handleTodoChangePassword = () => {
    setWhatTodo("change");
  };
  const handleDoNothing = () => {
    setWhatTodo("nothing");
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.currentTarget.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
  };

  const handleCheckNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNewPW(e.currentTarget.value);
  };

  const handleSubmitDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const result = await api.delete("/user/delete/userinfo", {
        data: { password: userPassword },
      });
      if (result.status === 200) {
        dispatch(modalActions.setHeaderMessage("안녕히 가세요"));
        dispatch(modalActions.setBodyMessage("회원탈퇴가 완료 되었습니다"));
        dispatch(userActions.logout());
        dispatch(modalActions.setConfirmFn("to_home"));
        dispatch(modalActions.open());
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(modalActions.setHeaderMessage("토큰이 만료되었습니다"));
        dispatch(modalActions.setBodyMessage("다시 로그인 후 시도해 주세요"));
        dispatch(userActions.logout());
        dispatch(modalActions.setConfirmFn("to_home"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 406) {
        dispatch(modalActions.setHeaderMessage("비밀번호 불일치"));
        dispatch(modalActions.setBodyMessage("비밀번호를 다시 입력해 주세요"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    } finally {
      setUserPassword("");
    }
  };

  const handleChangePasswordSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const result = await api.put("/user/change/password", {
        lastPassword: userPassword,
        newPassword: newPassword,
      });
      if (result.status === 200) {
        dispatch(modalActions.setHeaderMessage("변경 완료"));
        dispatch(modalActions.setBodyMessage("비밀번호가 변경 되었습니다"));
        dispatch(modalActions.open());
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        dispatch(modalActions.setHeaderMessage("토큰이 만료되었습니다"));
        dispatch(modalActions.setBodyMessage("다시 로그인 후 시도해 주세요"));
        dispatch(userActions.logout());
        dispatch(modalActions.setConfirmFn("to_home"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 406) {
        dispatch(modalActions.setHeaderMessage("비밀번호 불일치"));
        dispatch(modalActions.setBodyMessage("비밀번호를 다시 입력해 주세요"));
        dispatch(modalActions.open());
      } else if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    } finally {
      setUserPassword("");
      setNewPassword("");
      setCheckNewPW("");
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-20 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <h3 className="text-center">{user.userId}님 안녕하세요</h3>
          <div className="text-center mb-4">원하시는 작업을 선택해 주세요</div>
          {whatTodo === "delete" ? (
            <Form
              className="flex flex-col mx-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  value={userPassword}
                  onChange={handleChangePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Form>
          ) : null}
          {whatTodo === "change" ? (
            <Form
              className="flex flex-col mx-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>새 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={handleNewPassword}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>새 비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={checkNewPW}
                  onChange={handleCheckNewPassword}
                />
              </Form.Group>
            </Form>
          ) : null}
          {whatTodo === "nothing" ? (
            <div className="flex justify-center">
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleTodoDelete}
                variant="secondary"
              >
                회원 탈퇴
              </Button>
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleTodoChangePassword}
                variant="secondary"
              >
                비밀번호 변경
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleDoNothing}
                variant="secondary"
              >
                뒤로 가기
              </Button>
              {whatTodo === "delete" ? (
                <Button
                  className="mx-2"
                  style={{ width: "8rem" }}
                  onClick={handleSubmitDelete}
                  variant="primary"
                  disabled={userPassword === ""}
                >
                  회원 탈퇴
                </Button>
              ) : whatTodo === "change" ? (
                <Button
                  className="mx-2"
                  style={{ width: "8rem" }}
                  onClick={handleChangePasswordSubmit}
                  variant="primary"
                  disabled={checkNewPW !== newPassword || newPassword === ""}
                >
                  변경 하기
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <MyModal />
    </div>
  );
}

export default Mypage;
