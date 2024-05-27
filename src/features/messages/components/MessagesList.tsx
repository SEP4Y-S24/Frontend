import React, {useEffect, useState} from "react";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import ToggleMessages from "./ToggleMessages";
import {MessageResponseProps, ShowMessageProps} from "../types";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Heading from "../../../components/Elements/Headings/Heading";
import {getAllReceivedMessages, getAllSentMessages} from "../api/messageApi";
import storage from "../../../utils/storage";
import SpinnerComponent from "../../spinner/SpinnerComponent";
import {getPokemonPicById} from "../../avatarPic/api";


interface MessagesListProps {
    change: boolean;
}

const MessagesList = ({change}:MessagesListProps) => {
    const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const messagesPerPage = 5;
    const [receivedMessages, setReceivedMessages] = useState<MessageResponseProps[]>([]);
    const [sentMessages, setSentMessages] = useState<MessageResponseProps[]>([]);

    const handleTabChange = (tab: 'sent' | 'received') => {
        setActiveTab(tab);
    };

    const handleChangeOfPage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseReceivedMessages = await getAllReceivedMessages(storage.getUser().userId);
                const responseSentMessages = await getAllSentMessages(storage.getUser().userId);

                setReceivedMessages(responseReceivedMessages.messages);
                setSentMessages(responseSentMessages.messages);
                console.log(responseReceivedMessages.messages);
                console.log(responseSentMessages.messages);

            } catch (error) {
                console.error('Failed to get messages. Please try again later.');
            }
        };

        fetchMessages().then(() => setLoading(false));
    }, [change]);

    const messagesToDisplay = activeTab === 'received' ? receivedMessages : sentMessages;

    return (
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <div className="flex items-center mb-2">
                <ToggleMessages activeTab={activeTab} onTabChange={handleTabChange}/>
            </div>
            <div className={"pt-5"}>
                {loading ? (
                    <SpinnerComponent />
                ) : (
                    <>{messagesToDisplay.length > 0 ? (
                            <>
                                {messagesToDisplay
                                    .slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage).reverse()
                                    .map((message:MessageResponseProps, index) => (
                                        <Message
                                            key={index}
                                            email={activeTab==="sent"?message.receiverEmail:message.senderEmail}
                                            text={message.message}
                                            avatarId={activeTab==="sent"?message.receiverAvatarId:message.senderAvatarId}
                                            type={activeTab==="received"?"received":"sent"}
                                        />
                                    ))}
                                {messagesToDisplay.length > messagesPerPage && (
                                    <PaginationRounded
                                        page={currentPage}
                                        onChange={handleChangeOfPage}
                                        className="flex flex-col items-center"
                                        pages={Math.ceil(messagesToDisplay.length / messagesPerPage)}
                                    />
                                )}
                            </>
                        ) : (
                            <Heading
                                text={"You don't have any messages."}
                                type={"heading4"}
                                className="mb-3"
                            />
                        )}
                    </>
                )}
            </div>

        </ContentInnerContainer>
    );

}
export default MessagesList;
//TODO add avatar pic  when backend is ready
const Message: React.FC<ShowMessageProps> = ({
                                                         email,
                                                         text,
                                                         avatarId,
    type
                                                     }) => {
    const [avatar, setAvatar]  =useState("");
    useEffect(() => {
        getPokemonPicById(avatarId) // Fetch picture for Pikachu (ID 25)
            .then(pictureUrl => {
                if (pictureUrl) {
                    setAvatar(pictureUrl)
                    console.log( pictureUrl)
                }
            })
    }, [avatarId]);

    return (
        <div className="flex items-center space-x-3 p-3 hover:bg-whiteHover rounded">
            <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
            />
            <div>
                <p className="text-sm font-semibold">{type==="received"? "From:":"To:"} {email}</p>
                <p className="text-sm">{text}</p>
            </div>
        </div>
    );
};
