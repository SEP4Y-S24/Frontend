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
  const [contacts, setContacts] = useState<
    Array<{ email: string; imageSrc: string }>
  >([]);

  const [isHovered, setIsHovered] = useState<number | false>(false);

  const handleAddContact = () => {
    setMessage("");
    setErrors({});

    try {
      schema.parse({ email });
      console.log({ email });
      setMessage("Contact successfully added!");
      //logic to add the contacts to the list
      setContacts([
        ...contacts,
        {
          email,
          imageSrc:
            "https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj",
        },
      ]);
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
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
    setMessage("");
  };

  const handleDeleteContact = (index: number) => {
    // Update the contacts state to remove the contact at the given index
    setContacts((prevContacts) => prevContacts.filter((_, i) => i !== index));
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <Heading text={"Contacts"} type={"heading1"} className="mb-3" />
          {contacts.length === 0 ? (
            <Heading text={"You have no contacts."} type={"heading4"} />
          ) : (
            <>
              {contacts.map((contact, index) => (
                <div
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(false)}
              >
                  <div className="rounded-full overflow-hidden h-10 w-10 ">
                    <img
                      src={contact.imageSrc}
                      alt={contact.email}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <Heading text={contact.email} type={"heading3"} />
                  </div>

                  {/* ensures that the XMark icon appears only on the contact you're hovering over. */}
                  {isHovered === index && (
                  <div>
                    <button onClick={() => handleDeleteContact(index)}>
                      <XMarkIcon className="size-6 text-secondaryText" />
                    </button>
                  </div>
                )}
                </div>
              ))}

              {/* Conditionally render pagination only when there are 5 or more contacts */}
              {contacts.length >= 8 && (
                <PaginationRounded
                  className="flex flex-col items-center pt-4"
                  pages={2} // Replace with your pagination logic
                />
              )}
            </>
          )}
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
