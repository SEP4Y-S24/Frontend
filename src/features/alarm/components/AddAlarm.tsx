import {useEffect, useState} from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Dayjs } from "dayjs";
import Button from "../../../components/Elements/Button";
import {CreateAlarmProps} from "../types";
import { createAlarm} from "../api/alarmApi";
import SelectForm from "../../../components/Form/selectForm";
import {ClockPropsResponse, SimpleClockProps} from "../../clockSettings/types";
import {getAllClocks} from "../../clockSettings/api/clockApi";
import storage from "../../../utils/storage";


interface AddAlarmProps {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
} 


const AddAlarm: React.FC<AddAlarmProps> = ({ setChange}) => {
  const [alarmName, setAlarmName] = useState("");
  const [nameError, setNameError] = useState("");
  const [alarmTime, setAlarmTime] = React.useState<Dayjs | null>(null);
  const [timeError, setTimeError] = useState("");
  const [clockError, setClockError] = useState("");
    const [selectedClock, setSelectedClock] = useState<{ id: number; name: string }>({
        id: 0,
        name: "Select",
    });
    const [clocks, setClocks] = useState<SimpleClockProps[]>([]);
    useEffect(() => {
        const fetchClocks = async () => {
            try {
                console.log("inside try of fetching clocks");
                const response = await getAllClocks(storage.getUser().userId); // Adjust the endpoint to your API
                const clocks: SimpleClockProps[] = response.map(clock => ({
                    id: clock.id,
                    name: clock.name
                }));
                setClocks(clocks);
                console.log("clocks"+clocks);
            } catch (error) {
                console.error('Error fetching clocks:', error);
            }
        };

        fetchClocks();
    }, []);

    const toggleChangeAfterTwoSeconds = () => {
        setTimeout(() => {
            setChange(prevChange => !prevChange);
        }, 500); // 2000 milliseconds = 2 seconds
    };

  const handleAddAlarm = () => {
    if (!alarmTime) {
      setTimeError("Please select a time.");
      return;
    }
    if (!alarmName) {
        setNameError("Please enter a name.");
        return;
    }
    if (selectedClock.id === 0) {
        setClockError("Please select a clock");
        return;
    }
    else{
        let createAlarmData: CreateAlarmProps = {
            clock_id: selectedClock.id.toString(),
            hours: Number(alarmTime.format("HH")),
            minutes: Number(alarmTime.format("mm")),
            name: alarmName,
        }
        console.log(createAlarmData);
        createAlarm(createAlarmData).then((response) => {
            console.log(response);
            toggleChangeAfterTwoSeconds()
        }).catch(
            (error) => {
                console.log(error);
            }
        )
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
        <SelectForm
            dropdownLabel="Select a clock"
            options={clocks}
            className="mb-5"
            value={selectedClock}
            onChange={setSelectedClock}
            error={clockError}
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
