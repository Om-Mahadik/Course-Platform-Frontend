import React from 'react';
import './FilterTabs.css';

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["In-Progress", "Completed"];
  
  return (
    <div className="filter-wrapper">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;