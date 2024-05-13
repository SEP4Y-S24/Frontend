import React, { useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { ReceivedMessageProps, dummyDataReceivedMessages } from "../types";
import Heading from "../../../components/Elements/Headings/Heading";

const ReceivedMessages: React.FC = () => {
  const [receivedMessages, setReceivedMessages] = useState<
    ReceivedMessageProps[]
  >(dummyDataReceivedMessages);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 5;

  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      {receivedMessages.length > 0 ? (
        <>
          {receivedMessages
            .slice((currentPage - 1) * 5, currentPage * 5) // Adjust number of messages per page
            .map((message, index) => (
              <ReceivedMessage
                key={index}
                senderEmail={message.senderEmail}
                text={message.text}
              />
            ))}
          {receivedMessages.length > messagesPerPage && ( // Display pagination only if there are more than 5 alarms
            <PaginationRounded
              page={currentPage}
              onChange={handleChangeOfPage}
              className="flex flex-col items-center"
              pages={Math.ceil(receivedMessages.length / messagesPerPage)}
            />
          )}
        </>
      ) : (
        <Heading
          text={"You don't have any messages."}
          type={"heading4"}
          className="mb-3"
        />
      )}
    </>
  );
};

export default ReceivedMessages;

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({
  senderEmail,
  text,
}) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded">
      <div>
        <p className="text-sm font-semibold">From: {senderEmail}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
