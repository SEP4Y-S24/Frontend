import { useState } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Dayjs } from "dayjs";
import Button from "../../../components/Elements/Button";
import { AlarmProps } from "../types";

interface AddAlarmProps {
  addAlarm: (newAlarm: AlarmProps) => void;
}

const AddAlarm: React.FC<AddAlarmProps> = ({ addAlarm }) => {
  const [alarmName, setAlarmName] = useState("");
  const [alarmTime, setAlarmTime] = React.useState<Dayjs | null>(null);
  const [timeError, setTimeError] = useState("");

  const handleAddAlarm = () => {
    if (!alarmTime) {
      setTimeError("Please select a time.");
      return;
    }

    addAlarm({
      name: alarmName,
      time: alarmTime.format("HH:mm"),
      isEnabled: true, // new alarm is enabled by default
    });

    // Reset fields
    setAlarmName("");
    setAlarmTime(null);
    setTimeError("");
  };

  return (
    <>
      <Heading text={"Add an alarm"} type={"heading1"} className="mb-3" />
      <InputField
        labelText="Name"
        placeholder="Good morning!"
        className={"pb-3"}
        value={alarmName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAlarmName(e.target.value)
        }
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mt-2">
          <TimePicker
            views={["hours", "minutes"]}
            className={"w-full"}
            label="Time"
            value={alarmTime}
            onChange={(newValue) => setAlarmTime(newValue)}
          />
          {timeError && (
            <span className="text-danger text-sm">{timeError}</span>
          )}
        </div>
      </LocalizationProvider>

      <Button
        text={"Add an alarm"}
        onClick={handleAddAlarm}
        styleType={"info"}
        className={"mt-5 justify-center"}
        type="submit"
      />
    </>
  );
};

export default AddAlarm;
