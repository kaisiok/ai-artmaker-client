import MyCard from "../MyCard";
import Mydata from "../../data/data.json";

import { useState, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

type Tagprops = {
  tag: string;
  tagChange: Function;
  option: string;
  setOption: Function;
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
          />
        );
      })}
    </div>
  );
}

function Tagselect(): React.ReactElement {
  const [tagIdx, setTagIdx] = useState(0);
  const [selectedOption, SetSelectedOption] = useState("");

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
      tag="style"
    />, //0
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="target"
    />, //1
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="girl_pose"
    />, //2
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="guy_pose"
    />, //3
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="girl_face"
    />, //4
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="guy_face"
    />, //5
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="time"
    />, //6
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="background"
    />, //7
    <Tagselect_
      tagChange={setTagIdx}
      option={selectedOption}
      setOption={SetSelectedOption}
      tag="animal"
    />, //8
  ];

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl  text-white md:text-4xl">
          태그를 선택해서 그림을 만들어 보세요
        </div>
        <div className="text-base py-2 text-gray-lv2 md:text-xl">
          스타일, 자세, 구도, 배경을 고르면 이미지가 생성됩니다
        </div>
      </div>
      <TransitionGroup component={null}>
        <CSSTransition key={tagIdx} classNames="slide" timeout={300}>
          {tagComponent[tagIdx]}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default Tagselect;
