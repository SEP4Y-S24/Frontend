import { useState, useEffect } from "react";
import Heading from "../../../components/Elements/Headings/Heading";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import { useUser } from "../../../lib/auth";
import storage from "../../../utils/storage";

const CurrentTime = () => {
    let timezone = "Europe/Copenhagen";
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      const intervalID = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      // Clear interval on component unmount
      return () => clearInterval(intervalID);
    }, []); // Empty dependency array to run effect only once on mount
  
    const showTime = currentTime.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: false, // Display 24-hour format
    });
    const user = useUser();
    const name = user.data?.name;
    //const email = user.data?.email;
    const token = storage.getToken();
    return (
      <ContentInnerContainer className="mx-1 flex-1 md:h-auto bg-white">
        <Heading text={"Current time"} type={"heading1"} />
        <p className="text-lg font-semibold">{showTime}</p>
      </ContentInnerContainer>
    );
  };
  
  export default CurrentTime;