import Heading from "../../../components/Elements/Headings/Heading";
import InputField from "../../../components/Form/InputField";
import Button from "../../../components/Elements/Button";
import { useState } from "react";
import { z } from "zod";
import { addContact } from "../api/contactApi";
import storage from "../../../utils/storage";
import PopUp from "../../../components/Elements/PopUp/PopUp";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format. Please insert valid email."),
});

interface AddContactProps {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContact: React.FC<AddContactProps> = ({ change, setChange }) => {
  const [contactEmailToAdd, setContactEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const loggedUserEmail = storage.getUser().email; 

  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  
  const handleAddContact = () => {
    setErrors({});

    try {
      schema.parse({ email: contactEmailToAdd });

      addContact(contactEmailToAdd, loggedUserEmail )
        .then((response) => {
          
          setShowPopUp(true);
          setChange(!change);
        })
        .catch((error) => {
          console.error(error);
          setErrors({ apiError: "Something went wrong. Please try again." });
        });

      setContactEmail("");
      
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
    setContactEmail(e.target.value);
    setErrors({});
  };

  return (
    <>
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
        value={contactEmailToAdd}
        onChange={handleChange}
      />
      <Button text="Add" styleType={"info"} onClick={handleAddContact} />

      {errors.email && <p className="text-green mt-3">{errors.email}</p>}

      {showPopUp && (
        <PopUp
          title="Success"
          textAlert="Contact was added successfully!"
          type="success"
          buttonCancelText={"Close"}
          onCancel={() => setShowPopUp(false)}
        />
      )}
    </>
  );
};
export default AddContact;
