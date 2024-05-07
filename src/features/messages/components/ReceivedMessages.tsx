import Heading from "../../../components/Elements/Headings/Heading";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { ReceivedMessageProps } from "../types";

const ReceivedMessages = () => {
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
      <PaginationRounded className="flex flex-col items-center" pages={1} />
    </>
  );
};
export default ReceivedMessages;
