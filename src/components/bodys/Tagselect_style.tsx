import MyCard from "../MyCard";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function Tagselect_style() {
  const user = useAppSelector(selectUser);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl text-white md:text-4xl">
          먼저 그림의 전체적인 스타일을 선택하세요
        </div>
      </div>
      <div className="bg-gray-lv1 h-3/4 px-10 overflow-auto justify-center grid grid-cols-1 md:h-3/5 md:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center">
        <MyCard parent={"home"} />
        <MyCard parent={"home"} />
        <MyCard parent={"home"} />
        <MyCard parent={"home"} />
      </div>
    </div>
  );
}

export default Tagselect_style;
