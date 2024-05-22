import React, { useState } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import Switcher from "../../../components/Elements/Switcher/Switcher";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AlarmProps } from "../types";
import {updateAlarm} from "../api/alarmApi";

const Alarm: React.FC<AlarmProps> = ({ alarm_id, name, hours, minutes, isEnabled, onDelete }) => {
  const [checked, setChecked] = useState<boolean>(isEnabled);

  const handleSwitchChange = () => {

    setChecked(!checked);
    updateAlarm(alarm_id, checked).then((response) => {
        console.log(response);
    });
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-whiteHover hover:bg-background rounded mb-2">
      <div className="flex-grow">
        <Heading text={hours + ":" + minutes} type={"heading2"} />
        <Heading text={name || ""} type={"heading4"} />
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
