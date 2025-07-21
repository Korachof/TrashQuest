import Header from './Header';
import Footer from './Footer';
import React from 'react';
import MainContainer from './MainContainer';
import { layoutPageStyleWrapper } from '../../styles/layout';
import { useAuth } from '../../context/AuthContext';

function PageLayout({ children }) {
  const { currentUser } = useAuth();
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
