import React from 'react';
import { EchoProvider, useEcho } from './context/EchoContext';
import CosmicLayout from './components/layout/CosmicLayout';
import LandingPage from './components/pages/LandingPage';
import UploadPage from './components/pages/UploadPage';
import AnalysisPage from './components/pages/AnalysisPage';
import ConversationPage from './components/pages/ConversationPage';

const PageRouter = () => {
  const { currentPage } = useEcho();

  const pages = {
    landing: <LandingPage />,
    upload: <UploadPage />,
    analysis: <AnalysisPage />,
    conversation: <ConversationPage />,
  };

  return (
    <div className="page-transition">
      {pages[currentPage] || <LandingPage />}
    </div>
  );
};

const App = () => {
  return (
    <EchoProvider>
      <CosmicLayout>
        <PageRouter />
      </CosmicLayout>
    </EchoProvider>
  );
};

export default App;