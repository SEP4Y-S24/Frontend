import Button from "../components/Elements/Button";
import { useState } from "react";
import TextArea from "../components/Form/TextArea";
import SelectForm from "../components/Form/selectForm";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import PaginationRounded from "../components/Elements/Pagination/pagination";
import Heading from "../components/Elements/Headings/Heading";
import * as React from "react";

export const Messages = () => {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState<{ id: number; name: string }>({
    id: 0,
    name: "Select",
  });
  const [clock, setClock] = useState<{ id: number; name: string }>({
    id: 0,
    name: "Select",
  });

  const [messageError, setMessageError] = useState("");
  const [receiverError, setReceiverError] = useState("");
  const [clockError, setClockError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSendMessage = () => {
    
    setSuccessMessage("")

    if (!message.trim()) {
      setMessageError("Please enter a message");
    } else {
      setMessageError("");
    }

    if (!receiver || receiver.id === 0) {
      setReceiverError("Please select a receiver");
    } else {
      setReceiverError("");
    }

    if (!clock || clock.id === 0) {
      setClockError("Please select a clock");
    } else {
      setClockError("");
    }

    if (message && receiver.id !== 0 && clock.id !== 0) {
      setSuccessMessage("Message sent successfully!"); // Set success message
      // Clear form fields after successful message send
      setMessage("");
      setReceiver({ id: 0, name: "Select" });
      setClock({ id: 0, name: "Select" });
    }

    console.log("Message:", message);
    console.log("Receiver:", receiver);
    console.log("Clock:", clock);
  };

  interface ReceivedMessageProps {
    name: string;
    text: string;
    imageSrc: string;
  }
  const ReceivedMessage: React.FC<ReceivedMessageProps> = ({
    name,
    text,
    imageSrc,
  }) => {
    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded">
        <div className="rounded-full overflow-hidden h-10 w-10 ">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Send a message"} type={"heading1"} />

          <Heading
            text={"Do not have specific contact? Add a new contact here!"}
            type={"heading4"}
            className={"pb-3"}
          />
          <TextArea
            rows={4}
            labelText="Your message"
            placeholder="Write your message here"
            className="mb-4"
            value={message}
            onChange={setMessage}
            error={messageError}
          />
          <SelectForm
            dropdownLabel="Select receiver"
            options={receiverOptions}
            className="mb-4"
            value={receiver}
            onChange={setReceiver}
            error={receiverError}
          />
          <SelectForm
            dropdownLabel="Select clocks of receiver"
            options={clockOptions}
            className="mb-5"
            value={clock}
            onChange={setClock}
            error={clockError}
          />
          <Button
            text="Click me"
            styleType={"info"}
            onClick={handleSendMessage}
          />

          {successMessage && (
            <p className="text-green mt-3">{successMessage}</p>
          )}
        </ContentInnerContainer>
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Received messages"} type={"heading1"} />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <ReceivedMessage
            name="John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />

          <PaginationRounded
            className="flex flex-col items-center"
            pages={1}
          ></PaginationRounded>
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
