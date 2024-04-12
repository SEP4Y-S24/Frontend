import clsx from "clsx";
interface Props{
    text: string;
    color: "bg-green" | "bg-primaryColor" | "bg-danger";
    hover: "hover:bg-greenHover" | "hover:bg-primaryColorHover" | "hover:bg-dangerHover";
    onClick: () => void;
}

const Button = ({text, onClick, color, hover}: Props) => {


    return (
        <button   className={clsx(
            `${color} ${hover} text-white py-2 px-4 rounded`
        )}  onClick={onClick}>{text}</button>
);
};

export default Button;
