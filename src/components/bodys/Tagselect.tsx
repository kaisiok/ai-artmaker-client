import MyCard from "../MyCard";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";
import { useLocation, Outlet } from "react-router-dom";

function Tagselect(): React.ReactElement {
  const location = useLocation();
  const user = useAppSelector(selectUser);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl text-white md:text-4xl">
          먼저 그림의 전체적인 스타일을 선택하세요
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="slide" timeout={300}>
          <Outlet />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default Tagselect;
