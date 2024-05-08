import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ClockProps } from "../features/clockSettings/types";
import { TimeProps } from "../features/clockSettings/types";
import AddClock from "../features/clockSettings/components/AddClock";
import ChangeClockSettings from "../features/clockSettings/components/ChangeClockSettings";

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let formatedResponse = zones.format();
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

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AddClock clocks={clocks} setClocks={setClocks} />
        </ContentInnerContainer>
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <ChangeClockSettings clocks={clocks} setClocks={setClocks} />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
