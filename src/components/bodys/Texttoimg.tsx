import MyModal from "../MyModal";
import { Form, FloatingLabel, Button, Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { selectModal, modalActions } from "../../store/modal";
import { selectImg, imgActions } from "../../store/img";

function Texttoimg(): React.ReactElement {
  const [imgStyle, setImgStyle] = useState("black and white illustration");
  const [imgText, setImgText] = useState("");
  const [textColor, setTextColor] = useState("text-gray-500");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (imgText.length > 300) {
      setTextColor("text-red-500");
    } else {
      setTextColor("text-gray-500");
    }
  }, [imgText]);

  const styleList = [
    { value: "black and white illustration", label: "흑백" },
    { value: "oil painting", label: "유화" },
    { value: "realistic", label: "실사" },
    { value: "bishoujo", label: "만화" },
  ];

  function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    setImgStyle(e.currentTarget.value);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImgText(e.currentTarget.value);
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        process.env.REACT_APP_SERVER_ADRESS + "/img/texttoimg",
        { prompt: imgText, style: imgStyle },
        { withCredentials: true }
      );
      if (result.status === 200) {
        dispatch(imgActions.change(result.data));
        navigate("/result");
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
      } else {
        console.log(err);
      }
    } finally {
      setImgStyle("black and white illustration");
      setImgText("");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-16 px-10 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <FloatingLabel
            controlId="floatingTextarea2"
            label="그림을 글로 묘사해 주세요(영어 권장)"
            className="mb-2"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              value={imgText}
              onChange={handleChange}
              style={{ height: "200px" }}
            />
          </FloatingLabel>
          <div className={"flex justify-end text-xs"}>
            <div className={textColor}>{imgText.length}/300</div>
          </div>
          <Form className="grid grid-cols-2 pl-10 gap-y-1 mt-2 place-items-start lg:grid-cols-4">
            {styleList.map((el, idx) => {
              if (idx === 0) {
                return (
                  <Form.Check
                    key={"style-radio" + String(idx)}
                    type="radio"
                    name="group1"
                    value={el.value}
                    label={el.label}
                    onClick={handleClick}
                    defaultChecked
                  />
                );
              } else {
                return (
                  <Form.Check
                    key={"style-radio" + String(idx)}
                    type="radio"
                    name="group1"
                    value={el.value}
                    label={el.label}
                    onClick={handleClick}
                  />
                );
              }
            })}
          </Form>
          <div className="flex justify-center mt-6">
            <Button
              className="mx-2"
              style={{ width: "8rem" }}
              onClick={() => {
                navigate("/");
              }}
              variant="secondary"
            >
              뒤로 가기
            </Button>
            {isLoading ? (
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
            ) : (
              <Button
                className="mx-2"
                style={{ width: "8rem" }}
                onClick={handleSubmit}
                variant="primary"
                disabled={imgText.length === 0 || imgText.length > 300}
              >
                생성 하기
              </Button>
            )}
          </div>
        </div>
      </div>
      <MyModal />
    </div>
  );
}

export default Texttoimg;
