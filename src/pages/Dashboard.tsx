import InputField from "../components/Form/InputField";
import PopUp from "../components/Elements/PopUp/PopUp";
import {useState} from "react";

export const Dashboard = () => {
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

            {/* Render the PopUp component conditionally */}
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
};
