import Header from './Header';
import Footer from './Footer';
import React from 'react';
import MainContainer from './MainContainer';
import { layoutPageStyleWrapper } from '../../styles/layout';

function PageLayout({ children, currentUser }) {
  return (
    <div style={layoutPageStyleWrapper}>
      <Header currentUser={currentUser} />
      {/*Page style wrapper*/}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </div>
  );
}

export default PageLayout;
