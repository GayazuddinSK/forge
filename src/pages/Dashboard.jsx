import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import HeroSection from '../components/widgets/HeroSection';
import AttendanceTracker from '../components/widgets/AttendanceTracker';
import ToDoList from '../components/widgets/ToDoList';
import GitHubWidget from '../components/widgets/GitHubWidget';
import LinkedInWidget from '../components/widgets/LinkedInWidget';
import ResumeWidget from '../components/widgets/ResumeWidget';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full space-y-6">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px] lg:h-[450px]">
              <AttendanceTracker />
              <ToDoList />
            </div>
            <div className="min-h-[250px] lg:h-[250px]">
              <ResumeWidget />
            </div>
          </div>
          
          {/* Sidebar Area - 1/3 width on large screens */}
          <div className="space-y-6 flex flex-col">
            <div className="flex-1 min-h-[300px]">
              <GitHubWidget />
            </div>
            <div className="flex-1 min-h-[300px]">
              <LinkedInWidget />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
