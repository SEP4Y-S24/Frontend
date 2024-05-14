import React, {useEffect, useState} from "react";
import { ContentInnerContainer } from "../../../components/Layout/ContentInnerContainer";
import ToggleMessages from "./ToggleMessages";
import {dummyDataReceivedMessages, dummyDataSentMessages, ShowMessageProps} from "../types";
import PaginationRounded from "../../../components/Elements/Pagination/pagination";
import Heading from "../../../components/Elements/Headings/Heading";
import {fetchPokemon, getPokemonPicById} from "../../avatarPic/api";



const MessagesList = () => {
    const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const messagesPerPage = 5;

    const handleTabChange = (tab: 'sent' | 'received') => {
        setActiveTab(tab);
    };

    const handleChangeOfPage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    const receivedMessages = dummyDataReceivedMessages;
    const reversedSentMessages = dummyDataSentMessages.slice().reverse();
    const messagesToDisplay = activeTab === 'received' ? receivedMessages : reversedSentMessages;

    return (
        <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <div className="flex items-center mb-2">
                <ToggleMessages activeTab={activeTab} onTabChange={handleTabChange}/>
            </div>
            {messagesToDisplay.length > 0 ? (
                <>
                    {messagesToDisplay
                        .slice((currentPage - 1) * messagesPerPage, currentPage * messagesPerPage)
                        .map((message:ShowMessageProps, index) => (
                            <Message
                                key={index}
                                email={message.email}
                                text={message.text}
                                avatarId={message.avatarId}
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
        </ContentInnerContainer>
    );

}
export default MessagesList;
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
            .catch(error => {
            });
    }, []);

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
