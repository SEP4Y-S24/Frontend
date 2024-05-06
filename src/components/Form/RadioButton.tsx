import React, {useState} from "react";
interface Props {
    imageUrl: string;
    altText: string;
    id: string;
    selectedOption: string | null;
    onChange: (id: string) => void;
}
const RadioButtonCard: React.FC<Props> = ({ imageUrl, altText , id, onChange, selectedOption}) => {
    const isSelected = selectedOption === id;

    const handleInputChange = () => {
        onChange(id);
    };

    return (
        <div
            className={`radio-card bg-white border border-2 rounded-lg p-1  ${
                isSelected ? "border-primaryColor " : "border-stroke"
            }`}
        >
            <input
                name="radio-group"
                type="radio"
                radioGroup={"radio-group"}
                id={id}
                className="hidden"
                checked={isSelected}
                onChange={handleInputChange}
            />
            <label htmlFor={id} className="cursor-pointer block">
                <img src={imageUrl} alt={altText} />
            </label>
        </div>
    );
};

export default RadioButtonCard;
