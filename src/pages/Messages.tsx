import React, {ReactNode} from "react";
import { useState } from "react";
import { ContentLayout } from "../components/Layout/ContentLayout";
import MessagesList from "../features/messages/components/MessagesList";
import SendMessage from "../features/messages/components/SendMessage";
import { ShowMessageProps, dummyDataSentMessages } from "../features/messages/types";



export const Messages = () => {
  const receiverOptions = [
    { id: 1, name: "Receiver 1" },
    { id: 2, name: "Receiver 2" },
    { id: 3, name: "Receiver 3" },
  ];

  const clockOptions = [
    { id: 1, name: "Clock 1" },
    { id: 2, name: "Clock 2" },
    { id: 3, name: "Clock 3" },
  ];
    
  const [sentMessages, setSentMessages] = useState<ShowMessageProps[]>(dummyDataSentMessages);

  // Function to update the list of sent messages
  const updateSentMessages = (newSentMessages: ShowMessageProps[]) => {
    setSentMessages(newSentMessages);
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <SendMessage
          receiverOptions={receiverOptions}
          clockOptions={clockOptions}
          sentMessages={sentMessages}
          updateSentMessages={updateSentMessages}
        />
        <MessagesList
        />

      </ContentLayout>
    </>
  );
};
