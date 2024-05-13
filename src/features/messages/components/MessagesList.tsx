import React, { useState } from "react";
import ReceivedMessages from "./ReceivedMessagesList";
import SentMessages from "./SentMessagesList";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import ToggleMessages from "./ToggleMessages";



const MessagesList = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');

  const handleTabChange = (tab: 'sent' | 'received') => {
    setActiveTab(tab);
  };

  return (
    <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
      <div className="flex items-center mb-2">
        <ToggleMessages activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      {activeTab === 'received' ? <ReceivedMessages /> : <SentMessages />}
    </ContentInnerContainer>
  );
};

export default MessagesList;
