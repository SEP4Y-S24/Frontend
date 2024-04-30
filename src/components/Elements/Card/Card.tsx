import React from "react";

interface CardProps {
    imageUrl: string;
    altText: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, altText }) => {
    return (
        <div className="card rounded overflow-hidden shadow-md my-2">
            <img src={imageUrl} alt={altText} />
        </div>
    );
};

export default Card;
