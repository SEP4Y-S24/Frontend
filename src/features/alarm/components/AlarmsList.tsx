import Heading from "../../../components/Elements/Headings/Heading";
import { AlarmProps } from "../types";
import { useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";

interface AlarmsListProps {
  alarms: AlarmProps[];
  setAlarms: React.Dispatch<React.SetStateAction<AlarmProps[]>>;
}

const AlarmsList: React.FC<AlarmsListProps> = ({ alarms, setAlarms }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const alarmsPerPage = 5;

  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAlarmDelete = (alarmToDelete: AlarmProps) => {
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
                key={index}
                name={alarm.name}
                time={alarm.time}
                isEnabled={alarm.isEnabled}
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
