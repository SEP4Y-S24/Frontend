import React from 'react'

interface Props {
  className: string;
  subTitle: string,
}

const subTitleHeading: React.FC<Props> = ({className, subTitle}) => {
  return (
        <h4 className={`font-light text-dark text-1xl ${className}`}> {subTitle} </h4>
  )
}

export default subTitleHeading;