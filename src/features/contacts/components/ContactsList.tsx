import Heading from "../../../components/Elements/Headings/Heading";
import { ContactPropsResponse } from "../types";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { useEffect, useState } from "react";
import Contact from "./Contact";
import { deleteContact, getAllContactsByUserEmail } from "../api/contactApi";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import storage from "../../../utils/storage";
import PopUp from "../../../components/Elements/PopUp/PopUp";

interface ContactsListProps {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactsList: React.FC<ContactsListProps> = ({ change, setChange }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const contactsPerPage = 5;

  const [contacts, setContacts] = useState<ContactPropsResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [contactToDelete, setContactToDelete] =
    useState<ContactPropsResponse | null>(null);

  const userEmail = storage.getUser().email;

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllContactsByUserEmail(userEmail);
         setContacts(response.users);
      } catch (error) {
        setError("Failed to fetch contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts().then((r) => console.log("Contacts fetched"));
  }, [change]);

  const handleDeletePopup = (contact: ContactPropsResponse) => {
    setContactToDelete(contact);
    setShowPopUp(true);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      try {
        await deleteContact(contactToDelete.email, userEmail);
        setChange(!change);
        setShowPopUp(false);
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    }
  };

  return (
    <>
      <Heading text={"Contacts"} type={"heading1"} className="mb-3" />
      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <Heading text={error} type={"heading4"} className="mb-3 text-red-600" />
      ) : (
        <>
          {contacts && contacts.length > 0 ? (
            <>
              {contacts
                .slice(
                  (currentPage - 1) * contactsPerPage,
                  currentPage * contactsPerPage
                )
                .map((contact) => (
                  <Contact
                    key={contact.userId}
                    contact_id={contact.userId}
                    email={contact.email}
                    avatarId={contact.avatarId}
                    onDelete={() => handleDeletePopup(contact)}
                  />
                ))}
              {contacts.length > contactsPerPage && (
                <PaginationRounded
                  page={currentPage}
                  onChange={handleChangeOfPage}
                  className="flex flex-col items-center"
                  pages={Math.ceil(contacts.length / contactsPerPage)}
                />
              )}
            </>
          ) : (
            <Heading
              text={"You have no contacts."}
              type={"heading4"}
              className="mb-3"
            />
          )}
        </>
      )}

      {showPopUp && (
        <PopUp
          title="Delete contact"
          textAlert="Are you sure you want to delete this contact?"
          type="danger"
          buttonCancelText="Cancel"
          buttonProceedText={"Delete"}
          onClickProceed={handleConfirmDelete}
          onCancel={() => setShowPopUp(false)}
        />
      )}
    </>
  );
};
export default ContactsList;