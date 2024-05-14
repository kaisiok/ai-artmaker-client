import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function Mypage(): React.ReactElement {
  const [whatTodo, setWhatTodo] = useState("nothing");
  const user = useAppSelector(selectUser);

  const handleTodoDelete = () => {
    setWhatTodo("delete");
  };
  const handleTodoChangePassword = () => {
    setWhatTodo("change");
  };
  const handleDoNothing = () => {
    setWhatTodo("nothing");
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-40 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          {whatTodo === "delete" ? (
            <Form className="flex flex-col mx-2">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form>
          ) : null}
          {whatTodo === "change" ? (
            <Form className="flex flex-col mx-2">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>새 비밀번호</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>새 비밀번호 확인</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
                type="submit"
              >
                회원 탈퇴
              </Button>
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleTodoChangePassword}
                variant="secondary"
                type="submit"
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
                type="submit"
              >
                뒤로 가기
              </Button>
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleTodoChangePassword}
                variant="primary"
                type="submit"
              >
                submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mypage;
