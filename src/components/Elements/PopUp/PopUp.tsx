import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Button from "../Button";

interface Props{
    textAlert?: string;
    buttonCancelText: string;
    buttonProceedText?: string;
    type: "warning" | "success" | "info" |"danger";
    title: string;
    onClickProceed?:any;
}
const PopUp = ({textAlert, type, title, onClickProceed, buttonCancelText, buttonProceedText}: Props) => {
    const [open, setOpen] = useState(true)

    let iconComponent;
    let iconColor;
    switch (type) {
        case "warning":
            iconComponent = <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />;
            iconColor = "text-warning";
            break;
        case "danger":
            iconComponent = <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />;
            iconColor = "text-danger";
            break;
        case "success":
            iconComponent = <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />;
            iconColor = "text-green";
            break;
        case "info":
            iconComponent = <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />;
            iconColor = "text-primaryColor";
            break;
        default:
            iconComponent = null;
            iconColor = "text-primaryColor";
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10"  onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-stroke bg-opacity-50 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                {/* Render the icon with its color based on type */}
                                                {iconComponent &&  <div className={iconColor}>{iconComponent}</div>}
                                            </div>

                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {textAlert}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    { (buttonProceedText) && onClickProceed &&
                                    <Button text={buttonProceedText} type={type}  onClick={() => onClickProceed}/>}

                                    <Button text={buttonCancelText} type={"neutral"} className={"mr-3"} onClick={() => setOpen(false)}/>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
/*
usage of popup:

const [showPopup, setShowPopup] = useState(false);
    const handleButtonClick = () => {
        // Set showPopup state to true to display the popup
        setShowPopup(true);
    };
    const proceed = () => {
        console.log("Proceed button clicked");
    };
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleButtonClick}>Open Popup</button>


{showPopup && (
    <PopUp
        title="Warning"
        textAlert="Are you sure you want to deactivate?"
        type="success"
        buttonCancelText="Cancel"
        buttonProceedText={"Deactivate"}
        onClickProceed={proceed}
    />
)}
</>

);
 */
export default PopUp;
