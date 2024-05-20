import { useState, useEffect } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Texttoimg(): React.ReactElement {
  const [imgStyle, setImgStyle] = useState("state1");
  const [imgText, setImgText] = useState("");
  const [textColor, setTextColor] = useState("text-gray-500");

  useEffect(() => {
    if (imgText.length > 300) {
      setTextColor("text-red-500");
    } else {
      setTextColor("text-gray-500");
    }
  }, [imgText]);

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    setImgStyle(e.currentTarget.value);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImgText(e.currentTarget.value);
  }

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
          <Form className="grid grid-cols-2 gap-y-1 mt-2 place-items-center lg:grid-cols-4">
            <Form.Check
              type="radio"
              id="default-radio1"
              name="group1"
              value={"그림체1"}
              label={"그림체1"}
              onClick={handleClick}
              defaultChecked
            />
            <Form.Check
              type="radio"
              id="default-radio2"
              name="group1"
              value={"그림체2"}
              label={"그림체2"}
              onClick={handleClick}
            />
            <Form.Check
              type="radio"
              id="default-radio3"
              name="group1"
              value={"그림체3"}
              label={"그림체3"}
              onClick={handleClick}
            />
            <Form.Check
              type="radio"
              id="default-radio4"
              name="group1"
              value={"그림체4"}
              label={"그림체4"}
              onClick={handleClick}
            />
          </Form>
          <div className="flex justify-center mt-6">
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
            <Button
              className="mx-2"
              style={{ width: "8rem" }}
              onClick={() => {
                navigate("/result");
              }}
              variant="primary"
              type="submit"
            >
              submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Texttoimg;
