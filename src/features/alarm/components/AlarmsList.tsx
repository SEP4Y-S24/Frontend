import Heading from "../../../components/Elements/Headings/Heading";
import { AlarmPropsResponse } from "../types";
import { useEffect, useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";
import {deleteAlarm, getAllAlarmsByClockId} from "../api/alarmApi";




const AlarmsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [alarms, setAlarms] = useState<AlarmPropsResponse[]>([]);
  const alarmsPerPage = 5;
  //const clockId = storage.getClock() for now needs to be hardcoded
  //com
  const clockId = "f656d97d-63b7-451a-91ee-0e620e652c9e";

/*
  const toggleEnabled = (name: string, time: string) => {
    const updatedAlarms = alarms.map(alarm => {
      if (alarm.name === name && alarm.setOffTime === time) {
        return { ...alarm, isEnabled: !alarm.isActive };
      }
      return alarm;
    });
    setAlarms(updatedAlarms);
  };
  */



  const setAllAlarms = async (response: AlarmPropsResponse[]) => {
    await setAlarms(response);
    console.log('Alarms', alarms);
  };
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await getAllAlarmsByClockId(clockId);
        await setAllAlarms(response);
        console.log('Response', response);
      } catch (error) {
        console.error('Failed to fetch alarms:', error);
      }
    };

    fetchAlarms().then(r => console.log('Alarms fetched'));
  }, []);






  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAlarmDelete = (alarmToDelete: AlarmPropsResponse) => {
    deleteAlarm(alarmToDelete.id).then(async () => {
      const response = getAllAlarmsByClockId(clockId);
      setAlarms(await response);
      console.error('Response', response);
    }).catch((error) => {
      console.error('Failed to delete alarm:', error);
    });
  };

  return (
    <>
      <Heading text={"Alarms"} type={"heading1"} className="mb-3" />
      {alarms.length > 0 ? (
        <>
          {alarms
            .slice(
              (currentPage - 1) * alarmsPerPage,
              currentPage * alarmsPerPage
            )
            .map((alarm, index) => (
              <Alarm
                key={alarm.id}
                name={alarm.name}
                hours={alarm.hours}
                minutes={alarm.minutes}
                isEnabled={alarm.isActive}
                onDelete={() => handleAlarmDelete(alarm)}
              />
            ))}
      {alarms.length > alarmsPerPage && ( // Display pagination only if there are more than 5 alarms
            <PaginationRounded
              page={currentPage}
              onChange={handleChangeOfPage}
              className="flex flex-col items-center"
              pages={Math.ceil(alarms.length / alarmsPerPage)}
            />
          )}
        </>
      ) : (
        <Heading
          text={"You don't have any alarms."}
          type={"heading4"}
          className="mb-3"
        />
      )}
    </>
  );
};

export default AlarmsList;
