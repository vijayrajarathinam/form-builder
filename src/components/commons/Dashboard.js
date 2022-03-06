import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = ({ user, content }) => {
  const [showSidebar, onSetShowSidebar] = useState(false);

  return (
    <div className="flex bg-white text-gray-600 dark:text-[#676767] dark:bg-[#1e1e1e]">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        user={user}
        content={content}
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
};

export default Dashboard;
