import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { useState } from "react";
import PopUp from "../components/Elements/PopUp/PopUp";
import { ContactProps } from "../features/contacts/types";
import ContactsList from "../features/contacts/components/ContactsList";
import AddContact from "../features/contacts/components/AddContact";


export const Contacts = () => {
  const [change, setChange] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState<Array<ContactProps>>([]);
  const [selectedContact, setSelectedContact] = useState<ContactProps | null>(
    null
  );

  const [isHovered, setIsHovered] = useState<number | false>(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "delete" | null>(null);


  // const handleDeleteContact = (index: number) => {
  //   setSelectedContact(contacts[index]);
  //   handleDeletePopup();
  // };
  // // Function to handle the deletion process
  // const handleConfirmDelete = () => {
  //   const updatedContacts = [...contacts];
  //   updatedContacts.splice(
  //     updatedContacts.findIndex(
  //       (contact) => contact.email === selectedContact.email
  //     ),
  //     1
  //   );
  //   setContacts(updatedContacts);
  //   setShowPopUp(false);
  // };

  const handleSuccessPopup = () => {
    setPopupType("success");
    setShowPopUp(true);
  };

  const handleDeletePopup = () => {
    setPopupType("delete");
    setShowPopUp(true);
  };

  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <ContactsList
            change={change}
          />
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AddContact
            change={change}
            setChange={setChange}
          />
        </ContentInnerContainer>

        {showPopUp && popupType === "success" && (
          <PopUp
            title="Success"
            textAlert="Contact was added succesfully!"
            type="success"
            buttonCancelText={"Close"}
            onCancel={() => setShowPopUp(false)}
          />
        )}

        {/* {showPopUp && popupType === "delete" && (
          <PopUp
            title="Delete contact"
            textAlert="Are you sure you want to delete this contact?"
            type="danger"
            buttonCancelText="Cancel"
            buttonProceedText={"Delete"}
            onClickProceed={handleConfirmDelete}
            onCancel={() => setShowPopUp(false)}
          />
        )} */}
      </ContentLayout>
    </>
  );
};
