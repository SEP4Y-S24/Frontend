import clsx from "clsx";
import {useState} from "react";
interface Props{
    text: string;
    styleType: "warning" | "success" | "info" | "neutral" | "danger";
    onClick?: () => void;
    className?: string;
    isFilled: boolean;
}

const Badge = ({text, onClick, isFilled, styleType, className}: Props) => {
    let border;
    let textColor;
    let color;
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };


    switch (styleType) {
        case "danger":
            color = isFilled ? "bg-danger": "bg-dangerOpacity";
            border = "border border-danger";
            textColor = "text-white";
            break;
        case "success":
            color = isFilled ? "bg-green": "bg-greenOpacity";
            border = "border border-green";
            textColor = "text-white";
            break;
        case "info":
            color = isFilled ? "bg-primaryColor": "bg-primaryColorOpacity";
            border = "border border-primaryColor";
            textColor = "text-white";
            break;
        case "neutral":
            color = isFilled ? "bg-white": "bg-whiteOpacity";
            border = "border border-background";
            textColor = isFilled ? "text-white" : "text-gray-600";
            break;
        case "warning":
            color = isFilled ? "bg-warning": "bg-warningOpacity";
            border = " border border-warning";
            textColor = "text-white";
            break;
        default:
            color = isFilled ? "bg-primaryColor": "bg-primaryColorOpacity";
            border = " border border-primaryColor";
            textColor = "text-white";
    }

    return (
        <span
            className={clsx(color, className, "mr-1 my-3 cursor-default inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", isFilled ? textColor : color, border)}
            onClick={handleClick}
        >
            {text}
        </span>

    );
};

export default Badge;
