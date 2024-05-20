import MyCard from "../MyCard";

function Tagselect_pose(): React.ReactElement {
  return (
    <div className="bg-gray-lv1 h-3/4 px-10 overflow-auto justify-center grid grid-cols-1 md:h-3/5 md:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center">
      <MyCard parent={"home"} />
      <MyCard parent={"home"} />
      <MyCard parent={"home"} />
      <MyCard parent={"home"} />
    </div>
  );
}

export default Tagselect_pose;
