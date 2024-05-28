import Button from "react-bootstrap/Button";
import MyModal from "./MyModal";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectModal, modalActions } from "../store/modal";
import { selectImg, imgActions } from "../store/img";

type myCardProps = {
  parent: string;
  src: string;
  code: string;
  tagChange: Function;
  option: string;
  setOption: Function;
};

function MyCard({
  parent,
  src,
  code,
  tagChange,
  option,
  setOption,
}: myCardProps): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let navigateOption =
      parent === "style"
        ? 1
        : parent === "target" && code === "005"
        ? 7
        : parent === "target" && code === "006"
        ? 2
        : parent === "target" && code === "007"
        ? 3
        : parent === "target" && code === "008"
        ? 8
        : parent === "background"
        ? 6
        : parent === "girl_pose"
        ? 4
        : parent === "guy_pose"
        ? 5
        : parent === "animal"
        ? 7
        : 9;

    if (navigateOption === 9) {
      console.log(option + "/" + code);
      //axios
      //navigate
      try {
        const result = await axios.post(
          process.env.REACT_APP_SERVER_ADRESS + "/img/tagtoimg",
          { code: option + "/" + code },
          { withCredentials: true }
        );
        if (result.status === 200) {
          dispatch(imgActions.change(result.data));
          navigate("/result");
        }
      } catch (err: any) {
        if (err.response && err.response.status === 406) {
          dispatch(modalActions.setHeaderMessage("태그가 유효하지 않습니다"));
          dispatch(
            modalActions.setBodyMessage("정상적인 방법으로 태그를 골라주세요")
          );
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
        setOption("");
        tagChange(0);
      }
    } else {
      setOption(option + "/" + code);
      tagChange(navigateOption);
    }
  };

  return (
    <div className="w-48 h-96 my-2 relative rounded overflow-hidden">
      <img
        className="h-full"
        src={process.env.REACT_APP_SERVER_ADRESS + "/img/" + src}
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-3">
        <Button
          onClick={handleClick}
          variant="secondary"
          style={{
            fontSize: "1rem",
            width: "8rem",
            height: "2.5rem",
          }}
        >
          이미지 만들기
        </Button>
      </div>
      <MyModal />
    </div>
  );
}

export default MyCard;
