import MyModal from "../MyModal";
import {
  Form,
  FloatingLabel,
  Button,
  Spinner,
  Accordion,
} from "react-bootstrap";
import api from "../Api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store/user";
import { modalActions } from "../../store/modal";
import { imgActions } from "../../store/img";

function Texttoimg(): React.ReactElement {
  const [imgStyle, setImgStyle] = useState("001");
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
    { value: "001", label: "목탄 그림" },
    { value: "002", label: "인상파 유화" },
    { value: "003", label: "코믹 아트" },
    { value: "004", label: "잉크 아트" },
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
      const result = await api.post("/img/texttoimg", {
        prompt: imgText,
        style: imgStyle,
      });
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
      setImgStyle("001");
      setImgText("");
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-16 px-10 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3 overflow-auto ">
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
          <Accordion
            defaultActiveKey="0"
            flush
            className="my-10 border-1 border-solid border-gray-lv3 rounded-lg overflow-hidden"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>원하는 이미지를 얻기 위한 팁</Accordion.Header>
              <Accordion.Body style={{ fontSize: "0.8rem", lineHeight: "1.5" }}>
                <p>
                  기본적으로 한글로 입력된 문장은 <strong>DeepL 번역기</strong>
                  를 거쳐 영어로 번역됩니다.
                </p>
                <p>
                  영어가 능숙하시다면, 영어로 문장을 입력하시는게 더 정확한
                  결과를 얻을 수 있습니다.
                </p>
                <p>
                  키워드를 나열해서 이미지를 생성하는 방법도 있습니다. 예를
                  들어:
                </p>
                <ul>
                  <li>
                    <strong>one guy,</strong>
                  </li>
                  <li>
                    <strong>working,</strong>
                  </li>
                  <li>
                    <strong>sitting,</strong>
                  </li>
                  <li>
                    <strong>desk,</strong>
                  </li>
                  <li>
                    <strong>office,</strong>
                  </li>
                  <li>
                    <strong>&#123;tired&#125;</strong>
                  </li>
                </ul>
                <p>
                  위와 같이 입력하면 사무실에서 일하는 피곤한 남자 그림을 얻을
                  수 있습니다.(실제 입력에선 줄바꿈을 하면 안됩니다.)
                </p>
                <p>
                  <strong>&#123; &#125;</strong> 는 키워드를 강조하기 위해
                  사용됩니다.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <MyModal />
    </div>
  );
}

export default Texttoimg;
