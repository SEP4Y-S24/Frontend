import Heading from "../../../components/Elements/Headings/Heading";
import TextArea from "../../../components/Form/TextArea";
import SelectForm from "../../../components/Form/selectForm";
import React, {useEffect, useState} from "react";
import { MessageProps, SendMessageProps } from "../types";
import PopUp from "../../../components/Elements/PopUp/PopUp";
import Button from "../../../components/Elements/Button";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import { sendMessage } from "../api/messageApi";
import storage from "../../../utils/storage";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import {getAllContactsByUserEmail} from "../../contacts/api/contactApi";
import {getAllClocks} from "../../clockSettings/api/clockApi";


interface MessageParams {
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SimpleReceivers{
    id: string;
    name: string;
}
interface SimpleClocks{
    id: string;
    name: string;
}
const SendMessage = ({setChange}: MessageParams) => {
  const [contacts, setContacts] = useState<SimpleReceivers[]>();
  const [contactError, setContactError] = useState<string>("");
  const [receiverLoad, setReceiverLoad] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clockLoad, setClockLoad] = useState<boolean>(false);
  const [clocks, setClocks] = useState<SimpleClocks[]>([]);
  const [clocksError, setClocksError] = useState('');
  const [message, setMessage] = useState<MessageProps>({
    text: "",
    receiver: { id: "0", name: "Select" },
    clock: { id: "0", name: "Select" },
  });
  useEffect(() => {
    const updatedMessage = {
      ...message,
      clock: { id: "0", name: "Select" }
    };
    setClocksError("");
    setMessage(updatedMessage);
    const fetchContacts = async () => {
      try {
        setReceiverLoad(true);
        const response = await getAllContactsByUserEmail(storage.getUser().email);
        const receivers = response.users.map((receiver) => ({
          id: receiver.userId,
          name: receiver.name,
        }));
        setReceiverLoad(false);
        await setContacts(receivers);

        if (receivers.length > 0) {
          setClockLoad(true);
          await fetchClocks(message.receiver.id);
          setReceiverLoad(false);
        } else {
          setContactError("No contacts found! Please first add contacts to send messages.");
        }
      } catch (error) {
        // setContactError("Failed to fetch contacts. Please try again later.");
      } finally {
        setReceiverLoad(false);
      }
    };

    const fetchClocks = async (contactId: string) => {
      try {
        const clocksResponse = await getAllClocks(contactId);
        if (clocksResponse.length === 0 || (clocksResponse.length === 1 && Object.keys(clocksResponse[0]).length === 0)) {
          setClocksError("Receiver has no clocks");
        } else {
          setClocks(clocksResponse);
        }
      } catch (error) {
        // setClocksError("Failed to fetch clocks. Please try again later.");
      }
    };

    fetchContacts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.receiver.id]);


  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateMessages = () => {
    setTimeout(() => {
      setChange(prevChange => !prevChange);
    }, 500); // 2000 milliseconds = 2 seconds
  };

  const [messageError, setMessageError] = useState("");
  const [receiverError, setReceiverError] = useState("");
  const [clockError, setClockError] = useState("");
  const [showPopUp, setShowPopup] = useState(false);

  // for ASCII characters only
  const validateASCIIMessage = (text: string): boolean => {
    // eslint-disable-next-line no-control-regex
    const asciiRegex = /^[\x00-\x7F]*$/;
    return asciiRegex.test(text);
  };

  // max 96 characters
  const validateMessageLength = (text: string): boolean => {
    return text.length <=96;
  };

  const validateFields = () => {
    let valid = true;

    if (!message.text.trim()) {
      setMessageError("Please enter a message");
      valid = false;
    } else if (!validateASCIIMessage(message.text)) {
      setMessageError(
        "You may only use the characters A to Z, 0 to 9, and common symbols."
      );
      valid = false;
    } else if (!validateMessageLength(message.text)) {
      setMessageError("Message must be no more than 96 characters.");
      valid = false;
    } else {
      setMessageError("");
    }

    if (!message.receiver || message.receiver.id === "0") {
      setReceiverError("Please select a receiver");
      valid = false;
    } else {
      setReceiverError("");
    }

    if (!message.clock || message.clock.id === "0") {
      setClockError("Please select a clock");
      valid = false;
    } else {
      setClockError("");
    }

    return valid;
  };

  const handleSendMessage = () => {

    if (validateFields()) {
      setIsSubmitting(true);
      const messageToSend: SendMessageProps = {
        message: message.text,
        receiverId: message.receiver.id,
        clockId: message.clock.id,
        userId: storage.getUser().userId? storage.getUser().userId : "f8a383e2-38ee-4755-ac1f-c6aa881a5798",
      };

      sendMessage(messageToSend)
        .then(() => {
          updateMessages();
          setShowPopup(true);
          setMessage({
            text: "",
            receiver: { id: "0", name: "Select" },
            clock: { id: "0", name: "Select" },
          });
        })
        .catch((error:any) => {
          console.error("Error sending message:", error);
          // Handle error, such as displaying an error message to the user
        });
    }
    setIsSubmitting(false);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
        {receiverLoad?<SpinnerComponent/>:<>
        <Heading text={"Send a message"} type={"heading1"} />
        <Heading
          text={"Do not have specific contact? Add a new one in 'Contacts' !"}
          type={"heading4"}
          className={"pb-3"}
        />

        <TextArea
          rows={4}
          labelText="Your message"
          placeholder="Write your message here"
          className="mb-4"
          value={message.text}
          onChange={(newValue: string) => {
            setMessage((prevMessage) => ({
              ...prevMessage,
              text: newValue,
            }));
            setMessageError("");
          }}
          error={messageError}
        />
          <span className="text-danger text-sm">{contactError}</span>
        <SelectForm
          dropdownLabel="Select receiver from contacts"
          options={contacts? contacts : [{id: "0", name: "Select"}]}
          className="mb-4"
          value={message.receiver}
          onChange={(newValue: any) => {
            setMessage((prevMessage) => ({
              ...prevMessage,
              receiver: newValue,
            }));
            setReceiverError(""); 
          }}
          error={receiverError}
        />
          <span className="text-danger text-sm">{clocksError}</span>
        <SelectForm
          dropdownLabel= {"Select clocks of receiver"}
          options={clocks.length? clocks : [{id: "0", name: "Select"}]}
          className={ "mb-5" }
          value={message.clock}
          onChange={(newValue: any) =>
            setMessage((prevMessage) => ({
              ...prevMessage,
              clock: newValue,
            }))
          }
          error={receiverError}
          disabled={!!clocksError}
        />
        <div className={"pt-5"}>
          {isSubmitting ? (
              <SpinnerComponent />
          ) : (
              <Button
                  text="Send"
                  styleType={"info"}
                  onClick={handleSendMessage}

              />
          )}
        </div>

        {showPopUp && (
          <PopUp
            title="Success"
            textAlert="Message was sent succesfully!"
            type="success"
            buttonCancelText={"Close"}
            onCancel={handlePopupClose}
          />
        )}
        </>}
      </ContentInnerContainer>
    </>
  );
};
export default SendMessage;
