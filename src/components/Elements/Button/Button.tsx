
interface Props{
    text: string;
    color: string;
    onClick: () => void;
}

const Button = ({text, onClick, color}: Props) => {
    return (
        <button className={`bg-primaryColor hover:bg-blue-700 text-white py-2 px-4 rounded`}  onClick={onClick}>{text}</button>
);
};

export default Button;
