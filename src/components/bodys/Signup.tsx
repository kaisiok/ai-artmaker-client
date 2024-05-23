import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import MyModal from "../MyModal";

function Signup(): React.ReactElement {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPassward, setUserPassward] = useState("");
  const [checkPassward, setCheckPassword] = useState("");
  const [isCheckedId, setIsCheckedId] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("중복확인");
  const [showModal, setShowModal] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedId(false);
    setIdCheckMessage("중복확인");
    setUserId(e.currentTarget.value);
  };

  const checkId = async (id: string) => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_SERVER_ADRESS + "/user/checkid?id=" + id
      );
      if (result.status === 200) {
        setIsCheckedId(true);
        setIdCheckMessage("사용가능");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setIsCheckedId(false);
        setIdCheckMessage("사용불가");
      } else if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    }
  };
  const checkIdValid = (id: string): boolean => {
    const pattern = /^[a-zA-Z0-9@]+$/;
    return pattern.test(id) && id.length > 4;
  };

  const handlePasswardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassward(e.currentTarget.value);
  };

  const handleCheckPasswardChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckPassword(e.currentTarget.value);
  };

  const canSubmit = (): boolean => {
    return isCheckedId && userPassward !== "" && userPassward === checkPassward;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.REACT_APP_SERVER_ADRESS + "/user/signup",
        {
          id: userId,
          password: userPassward,
        }
      );
      if (result.status === 200) {
        setShowModal(true);
      }
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        navigate("/404");
      } else if (err.response && err.response.status === 500) {
        navigate("/500");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-40 px-10 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <Form className="flex flex-col" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ID</Form.Label>
              <div className="flex">
                <Form.Control
                  value={userId}
                  onChange={handleIdChange}
                  placeholder="Enter Id"
                />
                {checkIdValid(userId) ? (
                  <Button
                    className="mx-2"
                    style={{ width: "8rem", height: "2.5rem" }}
                    variant={
                      idCheckMessage === "사용불가" ? "secondary" : "primary"
                    }
                    onClick={() => {
                      checkId(userId);
                    }}
                  >
                    {idCheckMessage}
                  </Button>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip">유효하지 않은 id</Tooltip>
                    }
                  >
                    <Button
                      className="mx-2"
                      style={{ width: "8rem", height: "2.5rem" }}
                      variant="secondary"
                    >
                      중복확인
                    </Button>
                  </OverlayTrigger>
                )}
              </div>
              <Form.Text className="text-muted">
                We'll never share your id with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                value={userPassward}
                onChange={handlePasswardChange}
                type="password"
                placeholder="Password"
              />
              {userPassward.length > 5 || userPassward.length === 0 ? null : (
                <div className="text-red-600">
                  비밀번호는 6자리 이상이어야 합니다
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPasswordck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                value={checkPassward}
                onChange={handleCheckPasswardChange}
                type="password"
                placeholder="Password"
              />
              {userPassward === checkPassward ||
              checkPassward.length === 0 ? null : (
                <div className="text-red-600">비밀번호가 일치하지 않습니다</div>
              )}
            </Form.Group>
            <div className="flex justify-center">
              {canSubmit() ? (
                <Button
                  style={{ width: "8rem" }}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  style={{ width: "8rem" }}
                  variant="secondary"
                  type="submit"
                  disabled={true}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
      <MyModal
        show={showModal}
        handleConfirm={function (): void {
          setShowModal(false);
          navigate("/");
        }}
        handleClose={function (): void {
          setShowModal(false);
        }}
        message="회원가입이 완료되었습니다"
        messageHeader="환영합니다!"
      />
    </div>
  );
}

export default Signup;
