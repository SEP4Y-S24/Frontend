import Heading from "../../../components/Elements/Headings/Heading";
import { AlarmProps } from "../types";
import { useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Alarm from "./Alarm";

interface AlarmsListProps {
  alarms: AlarmProps[];
  onDelete: (alarm: AlarmProps) => void;
  // onToggle: (name: string, time: string) => void;
}

const AlarmsList: React.FC<AlarmsListProps> = ({ alarms, onDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const alarmsPerPage = 5;

  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
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
                id={alarm.id}
                name={alarm.name}
                time={alarm.time}
                isEnabled={alarm.isEnabled}
                onDelete={() => onDelete(alarm)}
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
