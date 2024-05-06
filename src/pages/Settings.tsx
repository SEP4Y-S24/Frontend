import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import SelectForm from "../components/Form/selectForm";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import Heading from "../components/Elements/Headings/Heading";
import Button from "../components/Elements/Button";
import InputField from "../components/Form/InputField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { utcTimezones } from "../features/clockSettings/data/timezones";
import PopUp from "../components/Elements/PopUp/PopUp";

interface TimeProps {
  id: number;
  name: string;
}

interface ClockProps {
  id: number;
  name: string;
  timezone: TimeProps;
}

export const Settings = () => {
  const [clocks, setClocks] = useState<ClockProps[]>([]);
  const [clockName, setClockName] = useState<string>("");
  const [newClockName, setNewClockName] = useState<string>("");
  const [selectedClock, setSelectedClock] = useState<ClockProps>({
    id: 0,
    name: "Select",
    timezone: { id: -13, name: "Select" },
  });
  const [selectedTimezone, setSelectedTimezone] = useState<TimeProps>({
    id: -13,
    name: "Select",
  });
  const [selectedChangedTimezone, setSelectedChangedTimezone] =
    useState<TimeProps>({
      id: -13,
      name: "Select",
    });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000); // Temporary
  };
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let timeRequest = "Etc/GMT";
        if (selectedTimezone.id > 0) {
          timeRequest += "+";
        }
        timeRequest += selectedTimezone.id;
        const zones = moment.tz(timeRequest);
        let formatedResponse = zones.format();
        console.log(convertIdToString(selectedTimezone.id));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    fetchData();
  }, [selectedTimezone]);

  function handleOnChangeTimezone(value: TimeProps) {
    setSelectedTimezone(value);
    console.log("Time:", value);
  }

  function handleOnChangeTimezone2(value: TimeProps) {
    setSelectedChangedTimezone(value);
    console.log("Time:", value);
  }

  const handleOnChangeClock = (value: ClockProps | any) => {
    if (value.id) {
      setSelectedClock(value);
      setNewClockName(value.name); // Set the new clock name when a clock is selected
    }
  };

  function convertIdToString(id: number): string {
    let IdToString = "";
    if (id > 0) {
      IdToString += "-" + id;
    }
    if (id < 0) {
      IdToString += "+" + id.toString().slice(1);
    }
    if (id === 0) {
      IdToString += id;
    }
    return IdToString;
  }

  const handleAddClock = () => {
    const newClock = {
      id: generateRandomId(),
      name: clockName !== "" ? clockName : "Unnamed Clock",
      timezone: selectedTimezone, // Use the selected timezone value
    };
    setClocks([...clocks, newClock]); // Add the new clock to the clocks array
    setClockName(""); // Reset the clock name field
    setSelectedTimezone({ id: -13, name: "Select" }); // Reset the selected timezone

    console.log("Clock added:", newClock);
  };

  const handleDeleteClock = (id: number) => {
    setShowPopup(true);
    setSelectedClock(clocks[id]);
  };

  // Function to handle the deletion process
  const handleConfirmDelete = () => {
    const updatedClocks = [...clocks];
    updatedClocks.splice(
      updatedClocks.findIndex((clock) => clock.id === selectedClock.id),
      1
    );
    setClocks(updatedClocks);
    setSelectedClock({ id: 0, name: "Select", timezone: { id: -13, name: "Select" } }); // Reset selected clock

    setShowPopup(false);
  };

  const handleSaveClockChanges = () => {
    const updatedClock = {
      ...selectedClock, // Spread existing clock data
      name: newClockName, // Update name with new value
      timezone: selectedChangedTimezone, // Update timezone with new value
    };
    setClocks(
      clocks.map((clock) =>
        clock.id === updatedClock.id ? updatedClock : clock
      )
    );
    setSelectedClock({
      id: 0,
      name: "Select",
      timezone: { id: -13, name: "Select" },
    });
    setSelectedChangedTimezone({ id: -13, name: "Select" });
    setNewClockName("");
    console.log("Updated Clock:", updatedClock);
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Add a new clock"} type={"heading1"} />
          <Heading
            text={"Add a new clock and set it up!"}
            type={"heading4"}
            className={"pb-3"}
          />
          <InputField
            labelText="Name of the clock"
            placeholder="e.g. Alexa"
            className={"pb-3"}
            value={clockName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClockName(e.target.value)
            }
          />
          <SelectForm
            dropdownLabel="Select timezone"
            options={utcTimezones}
            className="pb-3"
            value={selectedTimezone}
            onChange={handleOnChangeTimezone}
          />
          <Button
            text="Generate clock id"
            styleType="info"
            className="mt-3 mb-2"
            onClick={handleAddClock}
          />
          <Heading
            text={"Your clocks"}
            type={"heading2"}
            className={"pt-3 pb-4"}
          />
          {clocks.map((clock, index) => (
            <div
              key={index}
              className="mb-5 flex items-center space-x-3 p-3 hover:bg-whiteHover rounded-md shadow-md "
            >
              <div className="flex-grow">
                <Heading
                  key={clock.id}
                  text={clock.name.toUpperCase()}
                  type={"heading3"}
                />
                <Heading
                  key={clock.id}
                  text={clock.id.toString()}
                  type={"heading4"}
                />
                <Heading
                  key={clock.id}
                  text={clock.timezone.name}
                  type={"heading4"}
                />
              </div>
              <div>
                <button onClick={() => handleDeleteClock(index)}>
                  <XMarkIcon className="size-6 text-secondaryText" />
                </button>
              </div>
            </div>
          ))}
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
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
            onChange={handleOnChangeTimezone2}
          />
          <Button
            text="Save changes"
            styleType="info"
            className="mt-4"
            onClick={() => handleSaveClockChanges()}
          />
        </ContentInnerContainer>

        {showPopup && ( // Render the delete confirmation popup if showDeletePopup is true
          <PopUp
            title="Delete Clock"
            textAlert={`Are you sure you want to delete the clock "${selectedClock.name}"?`}
            type="danger"
            buttonCancelText="Cancel"
            buttonProceedText={"Delete"}
            onClickProceed={handleConfirmDelete}
          />
        )}
      </ContentLayout>
    </>
  );
};
