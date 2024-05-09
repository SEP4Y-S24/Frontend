import Heading from "../../../components/Elements/Headings/Heading";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import { ReceivedMessageProps } from "../types";
import * as React from "react";
import {useState} from "react";

const ReceivedMessages = () => {



    const [currentPage, setCurrentPage] = useState<number>(1);
    const handleChangeOfPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
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
            page={Number(currentPage)} onChange={handleChangeOfPage}
            className="flex flex-col items-center" pages={1}
            //pages={tasks?Math.ceil(tasks.length / 7):1}
            />
            </ContentInnerContainer>
    </>
  );
};
export default ReceivedMessages;
