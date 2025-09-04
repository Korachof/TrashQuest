// UI footer
import React from 'react';
import { Link } from 'react-router-dom';
import { navContainer } from '../../styles/layout';
import { footerStyleContainer } from '../../styles/layout';
import { footerContent as content } from '../../content/footerContent';

export default function Footer() {
  return (
    <footer style={footerStyleContainer}>
      {/*Nav Links*/}
      <nav style={navContainer}>
        <Link to="/terms">{content.terms}</Link>
        <Link to="/privacy">{content.policy}</Link>
        <Link to="/about">{content.about}</Link>
        <Link to="/contact">{content.contact}</Link>
      </nav>
      <p>{content.tagLine}</p>
    </footer>
  );
}
