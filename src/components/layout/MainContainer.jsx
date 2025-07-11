// Wrapper to apply consistent layouts, padding, and backgrounds across views and pages
import React from 'react';
import { mainContainerStyleWrapper } from '../../styles/layout';

function MainContainer({ children }) {
  return (
    // Normal page layout styling
    <main style={mainContainerStyleWrapper}>{children}</main>
  );
}

export default MainContainer;
