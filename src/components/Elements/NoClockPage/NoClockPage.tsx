import { ContentInnerContainer } from "../../Layout/ContentInnerContainer";
import Heading from "../Headings/Heading";

export const NoClockPage = () => {
  return (
    <>
      <ContentInnerContainer className="flex-1 md:h-auto bg-white">
        <Heading text={"No clocks are connected"} type={"heading1"} />

        <img
          src={
            "https://i.pinimg.com/736x/12/82/1a/12821aef23d6a0615e08d056bf5018e1.jpg"
          }
          alt={"no clocks"}
          height={"50%"}
          width={"20%"}
        />
      </ContentInnerContainer>
    </>
  );
};
