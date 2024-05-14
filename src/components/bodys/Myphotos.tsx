import MyCard from "../MyCard";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectUser, userActions } from "../../store/user";

function MyPhotos(): React.ReactElement {
  const user = useAppSelector(selectUser);

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl md:mt-8 text-white md:text-4xl">
          저장한 이미지를 다운받을 수 있습니다
        </div>
        <div className="text-base py-2 text-gray-lv2 md:text-xl">
          이미지를 최대 4장까지 저장할 수 있어요
        </div>
      </div>
      <div className="bg-gray-lv1 h-3/4 px-10 overflow-auto flex flex-wrap justify-center md:h-3/5 md:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center">
        <MyCard className={""} />
        <MyCard className={""} />
        <MyCard className={""} />
        <MyCard className={""} />
      </div>
    </div>
  );
}

export default MyPhotos;
