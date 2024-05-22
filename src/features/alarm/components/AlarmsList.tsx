import Heading from "../../../components/Elements/Headings/Heading";
import { AlarmProps, AlarmPropsResponse } from "../types";
import { useEffect, useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";
import { getAllAlarmsByClockId } from "../api/alarmApi";
import storage from "../../../utils/storage";

interface AlarmsListProps {
  alarms: AlarmPropsResponse[];
  setAlarms: React.Dispatch<React.SetStateAction<AlarmPropsResponse[]>>;
}

const AlarmsList: React.FC<AlarmsListProps> = ({ alarms, setAlarms }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const alarmsPerPage = 5;
  const clockId = storage.getClock()


  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await getAllAlarmsByClockId("f656d97d-63b7-451a-91ee-0e620e652c9e");
        setAlarms(response);
      } catch (error) {
        console.error('Failed to fetch alarms:', error);
      }
    };

    fetchAlarms();
  }, [clockId,setAlarms]);



  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAlarmDelete = (alarmToDelete: AlarmPropsResponse) => {
    const updatedAlarms = alarms
      ? alarms.filter((task) => task !== alarmToDelete)
      : [];
    setAlarms(updatedAlarms);
    console.log("Deleted alarm", alarmToDelete);
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
                time={alarm.setOffTime}
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
