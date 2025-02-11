import React from "react";

import { TabContext } from "../../common";
import { RightIcon } from "../../icons";

const Navigator = () => {
  return (
    <TabContext.Provider>
      {({ tabs }) => {
        return (
          <>
            <TabContext.Tabs
              disableUnderline
              renderTab={({ tab, tabIndex, activeTab }) => {
                if (activeTab === 0) return null;
                if (tabIndex > activeTab) return null;
                return (
                  <button
                    style={{ color: "var(--chatbot-grey)" }}
                    className="chat-button d-flex align-items-center my-3"
                    onClick={() => tabs[tabIndex].handleClick?.()}
                  >
                    {tabIndex !== 0 && (
                      <span
                        className="d-inline-block"
                        style={{ pointerEvents: "none", paddingRight: ".75em" }}
                      >
                        <RightIcon />
                      </span>
                    )}
                    <span
                      style={{
                        color:
                          tabIndex === activeTab
                            ? "var(--chatbot-primary)"
                            : "",
                      }}
                    >
                      {tab.title}
                    </span>
                  </button>
                );
              }}
            />
          </>
        );
      }}
    </TabContext.Provider>
  );
};

export default Navigator;
