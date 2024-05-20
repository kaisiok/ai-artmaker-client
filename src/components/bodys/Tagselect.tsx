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
        <div className="text-xl  text-white md:text-4xl">
          태그를 선택해서 그림을 만들어 보세요
        </div>
        <div className="text-base py-2 text-gray-lv2 md:text-xl">
          스타일, 자세, 구도, 배경을 고르면 이미지가 생성됩니다
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
