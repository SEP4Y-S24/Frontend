interface Props{
    text: string;
    type: "heading1" | "heading2" | "heading3" | "heading4" | "heading5";
    className?: string;
    style?: React.CSSProperties;
}

const Heading = ({text, type, className, style}: Props) => {
    let headingTag: JSX.Element;

    switch (type) {
        case "heading1":
            headingTag = <h1 style={style} className={`font-bold text-dark text-2xl ${className}`} > {text}</h1>;
            break;
        case "heading2":
            headingTag = <h2 style={style} className={`font-bold text-dark text-xl ${className}`} > {text}</h2>;
            break;
        case "heading3":
            headingTag = <h3 style={style} className={`font-medium text-dark text-base ${className}`} > {text}</h3>;
            break;
        case "heading4":
            headingTag = <h4 style={style} className={`font-normal text-primaryText text-base ${className}`} > {text}</h4>;
            break;
        case "heading5":
            headingTag = <h5 style={style} className={`font-normal text-primaryText text-sm ${className}`} > {text}</h5>;
            break;
        default:
            headingTag = <h3 style={style} className={`font-medium text-dark text-base ${className}`} > {text}</h3>;

    }

    return (
        <>
            {headingTag}
        </>

    );
};

export default Heading;
