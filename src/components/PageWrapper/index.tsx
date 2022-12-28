import React from 'react';

type Props = {
  children: React.ReactNode;
};

function PageWrapper({children}: Props) {
  return (
    <div className="flex h-screen justify-center items-center">{children}</div>
  );
}

export default PageWrapper;
