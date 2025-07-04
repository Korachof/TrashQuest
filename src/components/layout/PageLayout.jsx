import Header from './Header';
import Footer from './Footer';
import React from 'react';
import MainContainer from './MainContainer';

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {/*Page style wrapper*/}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </>
  );
}

export default PageLayout;
