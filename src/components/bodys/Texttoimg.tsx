import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function Texttoimg(): React.ReactElement {
  const [value, setValue] = useState([1]);

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  const handleChange = (val: any) => {
    console.log(val);
    if (val.length === 0) {
    } else {
      const newval = [val[val.length - 1]];
      setValue(newval);
    }
  };

  return (
    <div className="mt-14 h-[calc(100svh-56px)]">
      <div className="bg-gray-lv2 h-full flex justify-center">
        <div className="w-96 h-full bg-white pt-40 lg:px-20 lg:w-1/2 border-x-2 border-solid border-gray-lv3">
          <ToggleButtonGroup
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            <ToggleButton id="tbg-btn-1" value={1}>
              Option 1
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value={2}>
              Option 2
            </ToggleButton>
            <ToggleButton id="tbg-btn-3" value={3}>
              Option 3
            </ToggleButton>
            <ToggleButton id="tbg-btn-4" value={4}>
              Option 4
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default Texttoimg;
