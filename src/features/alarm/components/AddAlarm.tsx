import { useEffect, useState } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Dayjs } from "dayjs";
import Button from "../../../components/Elements/Button";
import { CreateAlarmProps } from "../types";
import { createAlarm } from "../api/alarmApi";
import { SimpleClockProps } from "../../clockSettings/types";
import { getAllClocks } from "../../clockSettings/api/clockApi";
import storage from "../../../utils/storage";
import PopUp from "../../../components/Elements/PopUp/PopUp";

interface AddAlarmProps {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAlarm: React.FC<AddAlarmProps> = ({ change, setChange }) => {
  const [alarmName, setAlarmName] = useState("");
  const [nameError, setNameError] = useState("");
  const [alarmTime, setAlarmTime] = React.useState<Dayjs | null>(null);
  const [timeError, setTimeError] = useState("");
  const [clockError, setClockError] = useState("");
  const [clocks, setClocks] = useState<SimpleClockProps[]>([]);
  const [clockId, setClockId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedClockId = storage.getClock()?.clockId || null;
      setClockId(storedClockId);
    } catch (error) {
      console.error("Error fetching clock ID from storage:", error);
      setClockId(null);
    }

    const fetchClocks = async () => {
      try {
        const response = await getAllClocks(storage.getUser().userId);
        const clocks: SimpleClockProps[] = response.map((clock) => ({
          id: clock.id,
          name: clock.name,
        }));
        setClocks(clocks);
      } catch (error) {
        console.error("Error fetching clocks:", error);
      }
    };

    fetchClocks();
  }, []);

  const handleAddAlarm = () => {
    if (clockId != null) {
      if (alarmTime == null) {
        setTimeError("Please select a time.");
        return;
      } else {
        let createAlarmData: CreateAlarmProps = {
          clock_id: clockId,
          hours: Number(alarmTime.format("HH")),
          minutes: Number(alarmTime.format("mm")),
          name: alarmName,
        };
        console.log(createAlarmData);
        createAlarm(createAlarmData)
          .then((response) => {
            console.log(response);
            setChange((prevChange) => !prevChange);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    // Reset fields
    setAlarmName("");
    setAlarmTime(null);
    setTimeError("");
    setNameError("");
    setClockError("");
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
        error={nameError}
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
        disabled={clockId === null}
      />
    </>
  );
};
export default AddAlarm;
