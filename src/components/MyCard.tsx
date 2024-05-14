import Button from "react-bootstrap/Button";

type myCardProps = {
  className?: string;
  parent?: string;
};

function MyCard({ className, parent }: myCardProps): React.ReactElement {
  return (
    <div className="w-60 h-96 p-4 relative">
      <div className={"bg-samplebg bg-cover h-full"}>
        {parent === "home" ? (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-5">
            <Button variant="secondary">이미지 만들기</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MyCard;
