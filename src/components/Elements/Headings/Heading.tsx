import {ReactTag} from "@headlessui/react/dist/types";

interface Props{
    text: string;
    type: "heading1" | "heading2" | "heading3" | "heading4" | "heading5";
    className?: string;
}

const Heading = ({text, type, className}: Props) => {
    let headingTag: JSX.Element;

    switch (type) {
        case "heading1":
            headingTag = <h1 className={`font-bold text-dark text-2xl ${className}`} > {text}</h1>;
            break;
        case "heading2":
            headingTag = <h2 className={`font-bold text-dark text-xl ${className}`} > {text}</h2>;
            break;
        case "heading3":
            headingTag = <h3 className={`font-medium text-dark text-base ${className}`} > {text}</h3>;
            break;
        case "heading4":
            headingTag = <h4 className={`font-normal text-primaryText text-base ${className}`} > {text}</h4>;
            break;
        case "heading5":
            headingTag = <h5 className={`font-normal text-primaryText text-sm ${className}`} > {text}</h5>;
            break;
        default:
            headingTag = <h3 className={`font-medium text-dark text-base ${className}`} > {text}</h3>;

    }

    return (
        <>
            {headingTag}
        </>

    );
};

export default Heading;
