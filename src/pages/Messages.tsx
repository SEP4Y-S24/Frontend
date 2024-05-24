import { useState } from "react";
import { ContentLayout } from "../components/Layout/ContentLayout";
import MessagesList from "../features/messages/components/MessagesList";
import SendMessage from "../features/messages/components/SendMessage";



export const Messages = () => {
    const [change, setChange] = useState<boolean>(false);

    return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <SendMessage  setChange={setChange} />
        <MessagesList change={change}/>
      </ContentLayout>
    </>
  );
};
