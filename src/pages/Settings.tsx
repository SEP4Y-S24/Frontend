import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import {ClockProps, SimpleClockProps} from "../features/clockSettings/types";
import { TimeProps } from "../features/clockSettings/types";
import AddClock from "../features/clockSettings/components/AddClock";
import ChangeClockSettings from "../features/clockSettings/components/ChangeClockSettings";
import Heading from "../components/Elements/Headings/Heading";
import SelectForm from "../components/Form/selectForm";

// lifting the state up to the parent component to manage clocks as props to child components.
export const Settings = () => {
  const [clocks, setClocks] = useState<ClockProps[]>([]);
  const [selectedTimezone] = useState<TimeProps>({
    id: -13,
    name: "Select",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let timeRequest = "Etc/GMT";
        if (selectedTimezone.id > 0) {
          timeRequest += "+";
        }
        timeRequest += selectedTimezone.id;
        const zones = moment.tz(timeRequest);
        console.log(convertIdToString(selectedTimezone.id));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    fetchData();
  }, [selectedTimezone]);

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
  //Todo get all clocks of the user from the database
  const clocksDummyList: SimpleClockProps[] = [
    { id: "f656d97d-63b7-451a-91ee-0e620e652c9e", name: "Alexa" },
    { id: "f656d97d-63b7-451a-91ee-0e620e652c99", name: "Ricardo clock" }
  ];
  //Todo get initial clock from local storage
  const [selectedClock, setSelectedClock] = useState<{ id: number; name: string }>({
    id: 0,
    name: "Select",
  });

  return (
    <>
      <ContentLayout className="relative">
        <ContentInnerContainer className={"w-full md:flex-1 mb-4 relative z-50 "}>
            <Heading text={"Switch to a different clock"} type={"heading1"}/>
            <Heading text={"To see a data of a different clock"} type={"heading4"}/>
          {clocksDummyList.length > 0 ? (
              <SelectForm
                  dropdownLabel="Select a clock"
                  options={clocksDummyList}
                  className="mb-5 z-50"
                  value={selectedClock}
                  onChange={setSelectedClock}
              />
          ) : (
              <Heading text={"No clocks have been added yet"} type={"heading4"} />
          )}

        </ContentInnerContainer>
        <div className={"flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 z-1"}>
          <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <AddClock clocks={clocks} setClocks={setClocks} />
          </ContentInnerContainer>
          <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <ChangeClockSettings clocks={clocks} setClocks={setClocks} />
          </ContentInnerContainer>
        </div>
      </ContentLayout>
    </>
  );
};
