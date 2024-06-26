import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NaverLoginButton from "../NaverLoginButton";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store/user";
import api from "../Api";

function Login(): React.ReactElement {
  const [userId, setUserId] = useState("");
  const [userPassward, setUserPassward] = useState("");
  const [warnnigMessage, setWarnigMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setWarnigMessage("");
    setUserId(e.currentTarget.value);
  };
  const handlePasswardChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWarnigMessage("");
    setUserPassward(e.currentTarget.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await api.post("/user/login", {
        id: userId,
        password: userPassward,
      });
      if (result.status === 200) {
        dispatch(userActions.login());
        dispatch(userActions.setUserId(result.data.username));
        api.defaults.headers["Authorization"] = `Bearer ${result.data.token}`;
        localStorage.setItem("authToken", result.data.token);
        setUserId("");
        setUserPassward("");
        navigate("/");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else if (
        err.response &&
        err.response.data.message === "invalid password"
      ) {
        setWarnigMessage("비밀번호가 일치하지 않습니다");
        setUserPassward("");
      } else if (
        err.response &&
        err.response.data.message === "user id doesn't exist"
      ) {
        setUserId("");
        setWarnigMessage("ID가 존재하지 않습니다");
        setUserPassward("");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white px-10 pt-40 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3 overflow-auto">
          <Form className="flex flex-col" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <div className="flex">
                <Form.Control
                  value={userId}
                  onChange={handleIdChange}
                  placeholder="Enter ID"
                />
              </div>
              <Form.Text className="text-muted">
                We'll never share your ID with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                value={userPassward}
                onChange={handlePasswardChange}
                placeholder="Password"
              />
            </Form.Group>
            <div className="flex justify-center">
              <NaverLoginButton />
              {userId.length > 0 && userPassward.length > 0 ? (
                <Button
                  style={{ width: "8rem" }}
                  className="mx-2"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  style={{ width: "8rem" }}
                  className="mx-2"
                  variant="primary"
                  type="submit"
                  disabled
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
          {warnnigMessage.length === 0 ? null : (
            <div className="text-red-600 text-center mt-2">
              {warnnigMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
