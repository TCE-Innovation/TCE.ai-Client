import React from "react";

import { TabContext } from "../../../common";

const SwitchMode = () => {
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
                      disabled
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
                      onClick={() => tabs[tabIndex].handleClick?.()}
                    >
                      <span>{tab.title}</span>
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

export default SwitchMode;
