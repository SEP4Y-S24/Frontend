import React, { useState } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import Switcher from "../../../components/Elements/Switcher/Switcher";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AlarmProps } from "../types";



interface AlarmComponentProps extends AlarmProps {
  onDelete: () => void;
  // onToggle: () => void;
}

const Alarm: React.FC<AlarmComponentProps> = ({ name, time, isEnabled, onDelete }) => {
  const [checked, setChecked] = useState<boolean>(isEnabled);

  const handleSwitchChange = () => {
    setChecked(!checked); // Toggle the switch state
    // You might want to update the alarm state here, if necessary
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-whiteHover hover:bg-background rounded mb-2">
      <div className="flex-grow">
        <Heading text={time} type={"heading2"} />
        <Heading text={name} type={"heading4"} />
      </div>
      <div>
        <Switcher isChecked={checked} onChange={handleSwitchChange} />
      </div>
      <div>
        <button onClick={onDelete}>
          <XMarkIcon className="size-6 text-secondaryText" />
        </button>
      </div>
    </div>
  );
};

export default Alarm;
