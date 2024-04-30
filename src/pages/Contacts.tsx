import Heading from "../components/Elements/Headings/Heading";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import PaginationRounded from "../components/Elements/Pagination/pagination";
import InputField from "../components/Form/InputField";
import Button from "../components/Elements/Button";
import { useState } from "react";
import * as z from "zod";
import { XMarkIcon } from "@heroicons/react/24/outline";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format. Please insert valid email."),
});

export const Contacts = () => {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState("");

  const handleAddContact = () => {
    setMessage("");
    setErrors({});

    try {
      schema.parse({ email });
      console.log({ email });
      setMessage("Contact successfully added!");
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update email state
    setErrors({ ...errors, email: "" });
    setMessage("");
  };

  const handleDeleteContact = () => {
    // Logic to delete the contact
  };

  interface ContactsProps {
    email: string;
    imageSrc: string;
  }
  const Contacts: React.FC<ContactsProps> = ({ email, imageSrc }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
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
            <button onClick={handleDeleteContact}>
              <XMarkIcon className="size-6 text-secondaryText" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Contacts"} type={"heading1"} className="mb-3" />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />
          <Contacts
            email="example@gmail.com"
            imageSrc="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
          />

          <PaginationRounded
            className="flex flex-col items-center"
            pages={1}
          ></PaginationRounded>
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Add a new contact"} type={"heading1"} />

          <Heading
            text={"Add a new contact to your list!"}
            type={"heading4"}
            className={"pb-3"}
          />
          <InputField
            labelText="Email"
            placeholder="example@gmail.com"
            className="mb-4"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <Button text="Add" styleType={"info"} onClick={handleAddContact} />

          {message && <p className="text-green mt-3">{message}</p>}
        </ContentInnerContainer>
      </ContentLayout>
    </>
  );
};
