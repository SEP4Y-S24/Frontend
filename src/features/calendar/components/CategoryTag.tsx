import clsx from "clsx";
import {CheckIcon} from "@heroicons/react/24/outline";
import {getTextColor} from "../types/categoryColorLogic";
import * as React from "react";
interface Props{
    text: string;
    color: string;
    onClick: () => void;
    className?: string;
    selected: boolean;
    disabled?: boolean;
}
const CategoryTag: React.FC<Props> = ({ text, onClick, className, color, selected, disabled }) => {
    const classStyle = clsx(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium mr-1 relative cursor-pointer",
        className,
        { 'selected': selected } // Add 'selected' class if the category is selected
    );

    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };
    const backgroundStyle = {
        backgroundColor: selected ? color : '#F4F4F4' // Change background color to grayish if not selected
    };
    const textStyle = {
        color: selected ? `${getTextColor(color)}` : '#000000' // Change text color based on selection
    };


    return (
        <span
            style={backgroundStyle}
            className={classStyle}
            onClick={onClick}
        >
            <span style={textStyle}>{text}</span>
            {selected && <CheckIcon className="h-3 w-3 ml-2" style={{ color: `${getTextColor(color)}` }} onClick={handleClick} />}
        </span>
    );
};

export default CategoryTag;
