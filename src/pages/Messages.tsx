import Button from "../components/Elements/Button";
import TextArea from "../components/Form/TextArea";
import SelectForm from "../components/Form/selectForm";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import {ContentLayout} from "../components/Layout/ContentLayout";

export const Messages = () => {

    const receiverOptions = [
        { id: 1, name: "Receiver 1" },
        { id: 2, name: "Receiver 2" },
        { id: 3, name: "Receiver 3" },
    ];

    const clockOptions = [
        { id: 1, name: "Clock 1" },
        { id: 2, name: "Clock 2" },
        { id: 3, name: "Clock 3" },
    ];


    return (
        <>
            <ContentLayout>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 h-16 md:h-auto bg-white ">
                <ContentInnerContainer>
            <TextArea rows={4} labelText="Your message" placeholder="Write your message here" className="mb-4"/>
            <SelectForm dropdownLabel="Select receiver" options={receiverOptions} className="mb-4"/>
            <SelectForm dropdownLabel="Select clocks of receiver" options={clockOptions} className="mb-5"/>
            <Button text="Click me" onClick={() => console.log("Button clicked")} color="bg-primaryColor" hover={"hover:bg-dangerHover"}/>
            </ContentInnerContainer>
                </div>
                <div className="flex-1 md:ml-0 h-16 md:h-auto bg-white">
                <ContentInnerContainer>
            <TextArea rows={4} labelText="Your message" placeholder="Write your message here" className="mb-4"/>
            <SelectForm dropdownLabel="Select receiver" options={receiverOptions} className="mb-4"/>
            <SelectForm dropdownLabel="Select clocks of receiver" options={clockOptions} className="mb-5"/>
            <Button text="Click me" onClick={() => console.log("Button clicked")} color="bg-primaryColor" hover={"hover:bg-dangerHover"}/>
            </ContentInnerContainer>
                </div>
            </div>
            </ContentLayout>
        </>
    );
};
