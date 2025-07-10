// Terms of Use page
import React from 'react';
import PageLayout from '../components/layout/PageLayout';


function TermsPage() {
  const effectiveDate = new Date('07/10/2025')
  return (
    <PageLayout>
      <h1>Terms of Use</h1>
      <p>Effective {effectiveDate.toLocaleDateString()} </p>
    </PageLayout>
  );
}


export default TermsPage;
