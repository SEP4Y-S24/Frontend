    
interface Props{
    text: string;
    style: string;
    onClick: () => void;
}

const Button = ({text, onClick, style}: Props) => {
    return (
       
        <button className={`bg-${style} hover:bg-blue-700 text-white py-2 px-4 rounded`} onClick={onClick}>{text}</button>
        
);
};

export default Button;
