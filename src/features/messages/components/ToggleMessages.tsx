const ToggleMessages: React.FC<{ activeTab: 'sent' | 'received', onTabChange: (tab: 'sent' | 'received') => void }> = ({ activeTab, onTabChange }) => {
    return (
      <div className="flex items-center border border-stroke rounded-lg">
        <button
          className={`px-4 py-2 rounded-tl-lg rounded-bl-lg ${
            activeTab === 'sent' ? 'bg-primaryColor text-white' : 'bg-white-200 text-primaryText'
          }`}
          onClick={() => onTabChange('sent')}
        >
          Sent Messages
        </button>
        <button
          className={`px-4 py-2 rounded-tr-lg rounded-br-lg ${
            activeTab === 'received' ? 'bg-primaryColor text-white' : 'bg-gray-200 text-primaryText'
          }`}
          onClick={() => onTabChange('received')}
        >
          Received Messages
        </button>
      </div>
    );
  };
  export default ToggleMessages