import Header from './Header';
import Footer from './Footer';
import React from 'react';
import MainContainer from './MainContainer';

function PageLayout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      {/*Page style wrapper*/}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </div>
  );
}

export default PageLayout;
