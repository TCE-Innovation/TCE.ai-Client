import React from "react";

import { TabContext } from "../../../../../common";

const Switcher = ({ disabled = false }) => {
  return (
    <div className="chatbot-mode-switcher">
      <TabContext.Provider>
        {({ tabs }) => {
          return (
            <>
              <TabContext.Tabs
                disableUnderline
                renderTab={({ tab, tabIndex, activeTab }) => {
                  return (
                    <button
                      disabled={disabled}
                      style={{
                        backgroundColor:
                          tabIndex === activeTab
                            ? "var(--chatbot-primary)"
                            : "transparent",
                        color:
                          tabIndex === activeTab
                            ? "white"
                            : "var(--chatbot-text-primary)",
                      }}
                      className="chat-button"
                      onClick={() =>
                        tabIndex !== activeTab && tabs[tabIndex].handleClick?.()
                      }
                    >
                      <div className="tooltip-container">
                        <span>{tab.title}</span>
                        {tabIndex !== activeTab && (
                          <div className="tooltip tooltip-dark align-bottom">
                            change project status to {tab.title}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                }}
              />
            </>
          );
        }}
      </TabContext.Provider>
    </div>
  );
};

export default Switcher;
