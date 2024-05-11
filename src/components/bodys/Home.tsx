import MyCard from "../MyCard";
import Button from "react-bootstrap/Button";

function Home(): React.ReactElement {
  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv4 h-1/4 md:h-2/5 text-center flex flex-col justify-center">
        <div className="text-xl md:mt-16 text-white md:text-4xl">
          나만의 핸드폰 배경화면을 만들어 보세요
        </div>
        <div className="text-base py-2 text-gray-lv2 md:text-xl">
          tag 혹은 문장을 이용해서 ai이미지를 만들 수 있습니다
        </div>
        <div className="md:mt-4">
          <Button className="mr-1 md:text-xl w-36 md:mr-4" variant="primary">
            tag로 생성하기
          </Button>
          <Button className="ml-1 md:text-xl w-36 md:ml-4" variant="secondary">
            문장으로 생성하기
          </Button>
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

export default Home;
