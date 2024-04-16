import * as React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  className: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const ContentLayout = ({ children, className }: ContentLayoutProps) => {
  return (
    <>
      <div className={classNames("m-5", className)}>{children}</div>
    </>
  );
};
