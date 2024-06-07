import MyCard from "../MyCard";
import Mydata from "../../data/data.json";
import { Button } from "react-bootstrap";

import { useState, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

type Tagprops = {
  tag: string;
  tagChange: Function;
  option: string;
  setOption: Function;
  lodingHandler: Function;
};

interface ISvgObj {
  [key: string]: any;
}
const MydataTs: ISvgObj = Mydata;

function Tagselect_({
  tag,
  tagChange,
  option,
  setOption,
  lodingHandler,
}: Tagprops): React.ReactElement {
  return (
    <div className="bg-gray-lv1 h-3/4 px-10 overflow-auto justify-center grid grid-cols-1 md:h-3/5 md:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center">
      {MydataTs[tag].map((el: any) => {
        return (
          <MyCard
            tagChange={tagChange}
            parent={tag}
            key={el.code}
            src={el.src}
            code={el.code}
            option={option}
            setOption={setOption}
            explanation={el.explanation}
            lodingHandler={lodingHandler}
          />
        );
      })}
    </div>
  );
}

function Tagselect(): React.ReactElement {
  const [tagIdx, setTagIdx] = useState(0);
  const [selectedOption, SetSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const closeFn = () => {
      setTagIdx(0);
      SetSelectedOption("");
    };
    return closeFn;
  }, []);

  const tagComponent = [
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="style"
    />, //0
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="target"
    />, //1
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="girl_pose"
    />, //2
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="guy_pose"
    />, //3
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="girl_face"
    />, //4
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="guy_face"
    />, //5
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="time"
    />, //6
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="background"
    />, //7
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      lodingHandler={setIsLoading}
      tag="animal"
    />, //8
  ];

  return (
    <div>
      {isLoading ? (
        <div className="mt-14 h-[calc(100svh-56px)]">
          <div className="bg-gray-lv2 h-full flex justify-center">
            <div className="w-96 h-full bg-white pt-8 lg:w-1/2 border-x-2 border-solid border-gray-lv3 overflow-auto">
              <div
                className={
                  "h-custom-h w-custom-w mx-auto rounded overflow-hidden border-1 border-solid border-gray-lv3 flex justify-center items-center"
                }
              >
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-lv3"></div>
              </div>
              <div
                id="button-wrappe1"
                className="h-10 flex justify-center mt-3"
              >
                <Button
                  className="mx-2"
                  style={{ width: "8rem" }}
                  variant="secondary"
                  type="submit"
                  disabled
                >
                  뒤로 가기
                </Button>
                <Button
                  variant="primary"
                  className="mx-2"
                  style={{ width: "8rem" }}
                  disabled
                >
                  저장
                </Button>
              </div>
              <div
                id="button-wrappe1"
                className="h-10 flex justify-center mt-3"
              >
                <Button
                  className="mx-2"
                  style={{ width: "17rem" }}
                  variant="primary"
                  type="submit"
                  disabled
                >
                  다운로드
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14 h-[calc(100svh-56px)]">
          <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
            <div className="text-xl  text-white md:text-4xl">
              태그를 선택해서 그림을 만들어 보세요
            </div>
            <div className="text-base py-2 text-gray-lv2 md:text-xl">
              모든 이미지는 ai를 통해 생성된 이미지 입니다
            </div>
          </div>
          <TransitionGroup component={null}>
            <CSSTransition key={tagIdx} classNames="slide" timeout={300}>
              {tagComponent[tagIdx]}
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    </div>
  );
}

export default Tagselect;
