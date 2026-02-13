import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AiCoach } from './components/AiCoach';
import { PlanGenerator } from './components/PlanGenerator';
import { TechniqueAnalysis } from './components/TechniqueAnalysis';
import { HomeWorkouts } from './components/HomeWorkouts';
import { Profile } from './components/Profile';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.AI_COACH: return <AiCoach />;
      case AppView.PLAN_GENERATOR: return <PlanGenerator />;
      case AppView.TECHNIQUE_ANALYSIS: return <TechniqueAnalysis />;
      case AppView.HOME_WORKOUTS: return <HomeWorkouts />;
      case AppView.PROFILE: return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <Layout currentView={currentView} setView={setCurrentView}>
        {renderView()}
      </Layout>
    </div>
  );
}

export default App;