import { useState } from "react";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import AddAlarm from "../features/alarm/components/AddAlarm";
import AlarmsList from "../features/alarm/components/AlarmsList";
import { AlarmProps, dummyDataForAlarms } from "../features/alarm/types";

export const Alarm = () => {

    const [alarms, setAlarms] = useState<AlarmProps[]>(dummyDataForAlarms);
    const addAlarm = (newAlarm: AlarmProps) => {
      setAlarms([...alarms, newAlarm]);
    };

    const toggleEnabled = (name: string, time: string) => {
      const updatedAlarms = alarms.map(alarm => {
        if (alarm.name === name && alarm.time === time) {
          return { ...alarm, isEnabled: !alarm.isEnabled };
        }
        return alarm;
      });
      setAlarms(updatedAlarms);
    };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AlarmsList alarms={alarms} setAlarms={setAlarms}/>
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <AddAlarm addAlarm={addAlarm} />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
