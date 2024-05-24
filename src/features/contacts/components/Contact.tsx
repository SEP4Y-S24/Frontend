import { XMarkIcon } from "@heroicons/react/24/outline";
import Heading from "../../../components/Elements/Headings/Heading";
import { ContactProps } from "../types";
import { useState } from "react";


const Contact: React.FC<ContactProps> = ({
  email,
  imageSrc,
  onDelete,
  index,
}) => {

    const [isHovered, setIsHovered] = useState(false);
 
  return (  
    <div
      key={index}
      className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-full overflow-hidden h-10 w-10 ">
        <img
          src={imageSrc}
          alt={email}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <Heading text={email} type={"heading3"} />
      </div>
      {isHovered && (
        <div>
          <button onClick={onDelete}>
            <XMarkIcon className="size-6 text-secondaryText" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
