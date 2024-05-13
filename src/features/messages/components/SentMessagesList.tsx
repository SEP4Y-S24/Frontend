import React, { useState } from "react";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { SentMessagesProps, dummyDataSentMessages } from "../types";
import Heading from "../../../components/Elements/Headings/Heading";

const SentMessages: React.FC = () => {
  const [sentMessages] = useState<SentMessagesProps[]>(
    dummyDataSentMessages
  );
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
      {sentMessages.length > 0 ? (
        <>
          {sentMessages
            .slice((currentPage - 1) * 5, currentPage * 5) // Adjust number of messages per page
            .map((message, index) => (
              <SentMessage
                key={index}
                userEmail={message.userEmail}
                text={message.text}
              />
            ))}
          {sentMessages.length > messagesPerPage && ( // Display pagination only if there are more than 5 alarms
            <PaginationRounded
              page={currentPage}
              onChange={handleChangeOfPage}
              className="flex flex-col items-center"
              pages={Math.ceil(sentMessages.length / messagesPerPage)}
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

export default SentMessages;

const SentMessage: React.FC<SentMessagesProps> = ({ userEmail, text }) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded">
      <div>
        <p className="text-sm font-semibold">To: {userEmail}</p>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};
