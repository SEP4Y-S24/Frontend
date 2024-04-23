import Button from "../components/Elements/Button";
import TextArea from "../components/Form/TextArea";
import SelectForm from "../components/Form/selectForm";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";

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
          <TextArea
            rows={4}
            labelText="Your message"
            placeholder="Write your message here"
            className="mb-4"
          />
          <SelectForm
            dropdownLabel="Select receiver"
            options={receiverOptions}
            className="mb-4"
          />
          <SelectForm
            dropdownLabel="Select clocks of receiver"
            options={clockOptions}
            className="mb-5"
          />

        </ContentInnerContainer>
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <ReceivedMessage
              name="John Doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
            />
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
