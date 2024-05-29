import { useState } from "react";
import Button from "../../../components/Elements/Button";
import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import SelectForm from "../../../components/Form/selectForm";
import { ClockProps, ClockPropsResquest, TimeProps } from "../types";
import { utcTimezones } from "../data/timezones";
import { updateClock } from "../api/clockApi";
import storage from "../../../utils/storage";

const ChangeClockSettings = ({
  clocks,
  setClocks,
}: {
  clocks: ClockProps[];
  setClocks: React.Dispatch<React.SetStateAction<ClockProps[]>>;
}) => {
  const [selectedClock, setSelectedClock] = useState<ClockProps>({
    id: "0",
    name: "Select",
    timezone: { id: -13, name: "Select" },
  });
  const [newClockName, setNewClockName] = useState<string>("");
  const [selectedChangedTimezone, setSelectedChangedTimezone] =
    useState<TimeProps>({ id: -13, name: "Select" });

  const handleOnChangeClock = (value: ClockProps | any) => {
    setSelectedClock(value);
    if (value) {
      setNewClockName(value.name); // Set the new clock name when a clock is selected
    }
  };

  const handleSaveClockChanges =async () => {



    console.log(selectedChangedTimezone.id)
    try {
      const clockToUpdate  : ClockPropsResquest = {
        id: storage.getClock().clockId,
        name : newClockName,
        userId : storage.getUser().userId,
        timeOffset : selectedChangedTimezone.id *60
      }
     const response =  await updateClock(clockToUpdate, selectedClock.id)
     if (response) {
      const updatedClocks = clocks.map((clock) =>
        clock.id === selectedClock.id
          ? { ...clock, name: newClockName, timezone: selectedChangedTimezone }
          : clock
      );
      setClocks(updatedClocks);
      setSelectedChangedTimezone({ id: -13, name: "Select" });
      setNewClockName("");
     }
    } catch (error) {
      console.error(error)
    }
  };

  function handleOnChangeTimezone(value: TimeProps) {
    setSelectedChangedTimezone({id: value.id, name: value.name});
    console.log(' handleon change' + selectedChangedTimezone.id + selectedChangedTimezone.name)
  }
  return (
    <>
      <Heading text={"Change clock settings"} type={"heading1"} />
      <Heading
        text={"Change the settings of your existing clock"}
        type={"heading4"}
        className={"pb-3"}
      />
      <SelectForm
        dropdownLabel="Select clock"
        options={clocks}
        className="pb-3"
        value={selectedClock}
        onChange={handleOnChangeClock}
      />
      <InputField 
        labelText="Change name"
        placeholder=""
        className={"pb-3"}
        value={newClockName} // Bind value to newClockName
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewClockName(e.target.value)
        }
      />
      <SelectForm
        dropdownLabel="Select timezone"
        options={utcTimezones}
        className="pb-3"
        value={selectedChangedTimezone}
        onChange={handleOnChangeTimezone}
      />
      <Button
        text="Save changes"
        styleType="info"
        className="mt-4"
        onClick={() => handleSaveClockChanges()}
      />
    </>
  );
};
export default ChangeClockSettings;
