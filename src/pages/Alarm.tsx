import { useState } from "react";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import AddAlarm from "../features/alarm/components/AddAlarm";
import AlarmsList from "../features/alarm/components/AlarmsList";
import { AlarmProps, AlarmPropsResponse} from "../features/alarm/types";

export const Alarm = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /*const toggleEnabled = (name: string, time: string) => {
      const updatedAlarms = alarms.map(alarm => {
        if (alarm.name === name && alarm.setOffTime === time) {
          return { ...alarm, isEnabled: !alarm.isActive };
        }
        return alarm;
      });
      setAlarms(updatedAlarms);
    };*/
//com
  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AlarmsList/>
        </ContentInnerContainer>

         <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <AddAlarm />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
