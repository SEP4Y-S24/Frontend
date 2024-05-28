import { XMarkIcon } from "@heroicons/react/24/outline";
import Heading from "../../../components/Elements/Headings/Heading";
import { ContactProps } from "../types";
import { useEffect, useState } from "react";
import { getPokemonPicById } from "../../avatarPic/api";


const Contact: React.FC<ContactProps> = ({
  email,
  avatarId,
  onDelete,
  contact_id,
}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
      const fetchImage = async () => {
        const url = await getPokemonPicById(avatarId);
        setImageUrl(url);
      };
  
      fetchImage();
    }, [avatarId]);
 
  return (  
    <div
      key={contact_id}
      className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-full overflow-hidden h-10 w-10 ">
      {imageUrl ? (
          <img src={imageUrl} alt={email} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-200" /> // Placeholder while loading
        )}
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
