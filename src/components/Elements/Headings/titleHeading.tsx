import React from 'react'

interface Props {
  className: string;
  heading: string;
}

const TitleHeading: React.FC<Props> = ({ className, heading }) => {
  return (
    <div>
      <h4 className={`font-bold text-dark text-2xl ${className}`}>{heading}</h4>
    </div>
  );
};

export default TitleHeading;