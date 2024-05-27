import Heading from "../../../components/Elements/Headings/Heading";
import { ContactPropsResponse, ContactsPropsResponse } from "../types";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import { useEffect, useState } from "react";
import Contact from "./Contact";
import { deleteContact, getAllContactsByUserEmail } from "../api/contactApi";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import storage from "../../../utils/storage";

interface ContactsListProps {
  change: boolean;
}

const ContactsList: React.FC<ContactsListProps> = ({ change }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleChangeOfPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const contactsPerPage = 5;

  const [contacts, setContacts] = useState<ContactPropsResponse[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setAllContacts = (response: ContactsPropsResponse) => {
    setContacts(response.contacts);
    console.log("Contacts", contacts);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllContactsByUserEmail(storage.getUser().email);
        await setAllContacts(response);
        console.log("Response", response);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setError("Failed to fetch contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts().then((r) => console.log("Contacts fetched"));
  }, [change]);

  const handleDeleteContact = (contactToDelete: ContactPropsResponse) => {
    deleteContact(contactToDelete.id)
      .then(async () => {
        const response = getAllContactsByUserEmail(storage.getUser().email);
        await setAllContacts(await response);
        console.log("Response", response);
      })
      .catch((error) => {
        console.error("Failed to delete alarm:", error);
      });
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
          {contacts.length === 0 ? (
            <Heading text={"You have no contacts."} type={"heading4"} />
          ) : (
            <>
              {contacts.map((contact, index) => (
                <Contact
                  key={index}
                  email={contact.email}
                  imageSrc={contact.imageSrc}
                  index={index}
                  onDelete={() => handleDeleteContact(contact)}
                />
              ))}

              {/* Conditionally render pagination only when there are 5 or more contacts*/}
              {contacts.length > contactsPerPage && ( // Display pagination only if there are more than 5 alarms
                <PaginationRounded
                  page={currentPage}
                  onChange={handleChangeOfPage}
                  className="flex flex-col items-center"
                  pages={Math.ceil(contacts.length / contactsPerPage)}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default ContactsList;
