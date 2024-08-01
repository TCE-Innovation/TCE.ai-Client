import React, { createContext, useContext, useEffect, useState } from "react";

import Wrapper from "./style";

const TabContext = createContext();

export const useTabContext = () => {
  const values = useContext(TabContext);
  if (!values) throw new Error("tab context provider not in scope");
  return values;
};

const TabContextProvider = ({ children, ...props }) => {
  const { tabs, defaultActive = 0 } = props;
  const [activeTab, setActiveTab] = useState(defaultActive);

  useEffect(() => {
    setActiveTab(defaultActive);
  }, [defaultActive]);

  const values = {
    activeTab,
    tabs,
    setActiveTab,
  };
  return (
    <TabContext.Provider value={values}>
      <Wrapper>{children}</Wrapper>
    </TabContext.Provider>
  );
};

const Panes = ({ children }) => {
  const { activeTab } = useTabContext();
  const paneElements = React.Children.toArray(children);

  const activePane = paneElements[activeTab];

  return <div className="chatbot-tab-pane">{activePane}</div>;
};

const Provider = ({ children }) => {
  const props = useTabContext();
  return children(props);
};

const Tabs = ({ renderTab, disableUnderline = false }) => {
  const { tabs, activeTab, setActiveTab } = useTabContext();

  return (
    <div className="chatbot-tabs">
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            className={`${!disableUnderline ? "chatbot-tab" : ""} ${
              !disableUnderline && activeTab === i ? "chatbot-active-tab" : ""
            }`}
            onClick={() => setActiveTab(i)}
          >
            {renderTab ? (
              <>{renderTab({ tab, tabIndex: i, activeTab })}</>
            ) : (
              tab
            )}
          </div>
        );
      })}
    </div>
  );
};

TabContextProvider.Tabs = Tabs;
TabContextProvider.Panes = Panes;
TabContextProvider.Provider = Provider;

export default TabContextProvider;
