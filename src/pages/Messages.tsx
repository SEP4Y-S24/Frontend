import { ContentLayout } from "../components/Layout/ContentLayout";
import MessagesList from "../features/messages/components/MessagesList";
import SendMessage from "../features/messages/components/SendMessage";

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

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <SendMessage
          receiverOptions={receiverOptions}
          clockOptions={clockOptions}
        />
        <MessagesList />
      </ContentLayout>
    </>
  );
};
