import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import { useState } from "react";
import ContactsList from "../features/contacts/components/ContactsList";
import AddContact from "../features/contacts/components/AddContact";


export const Contacts = () => {
  const [change, setChange] = useState<boolean>(false);
  
  return (
    <>
      <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <ContactsList
            change={change} setChange={setChange}
          />
        </ContentInnerContainer>

        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
          <AddContact
            change={change}
            setChange={setChange}
          />
        </ContentInnerContainer>

      </ContentLayout>
    </>
  );
};
