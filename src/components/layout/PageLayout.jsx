import Header from './Header';
import Footer from './Footer';
import React from 'react';
import MainContainer from './MainContainer';
import { layoutPageStyleWrapper } from '../../styles/layout';

function PageLayout({ children }) {
  return (
    <div style={layoutPageStyleWrapper}>
      <Header />
      {/*Page style wrapper*/}
      <MainContainer>{children}</MainContainer>
      <Footer />
    </div>
  );
}

export default PageLayout;
