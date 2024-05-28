import clsx from "clsx";
interface Props{
    text: string;
    styleType: "warning" | "success" | "info" | "neutral" | "danger";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
}

const Button = ({text, onClick, styleType, className, type, disabled}: Props) => {
    let border;
    let textColor;
    let hover;
    let color;
    if (type === undefined) {
        type = "button";
    }

    switch (styleType) {
        case "danger":
            color = "bg-danger";
            hover = "hover:bg-dangerHover";
            border = "border-none";
            textColor = "text-white";
            break;
        case "success":
            color = "bg-green";
            hover = "hover:bg-greenHover";
            border = "border-none";
            textColor = "text-white";
            break;
        case "info":
            color = "bg-primaryColor";
            hover = "hover:bg-primaryColorHover";
            border = "border-none";
            textColor = "text-white";
            break;
        case "neutral":
            color = "bg-white";
            hover = "hover:bg-whiteHover";
            border = "border border-stroke";
            textColor = "text-dark";
            break;
        case "warning":
            color = "bg-warning";
            hover = "hover:bg-warningHover";
            border = "border-none";
            textColor = "text-white";
            break;
        default:
            color = "bg-primaryColor";
            hover = "hover:bg-primaryColorHover";
            border = "border-none";
            textColor = "text-white";
    }

    return (
        <button   className={clsx(
            `${color} ${hover} ${className} py-2 px-4 rounded ${border} ${textColor}`
        )}  onClick={onClick} type={type} disabled={disabled}>{text}</button>
);
};

export default Button;
