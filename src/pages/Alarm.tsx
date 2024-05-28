
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import AddAlarm from "../features/alarm/components/AddAlarm";
import AlarmsList from "../features/alarm/components/AlarmsList";
import {useState} from "react";


export const Alarm = () => {
    const [change, setChange] = useState<boolean>(false);
  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AlarmsList change={change}/>
        </ContentInnerContainer>

         <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        <AddAlarm change={change} setChange={setChange} />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
