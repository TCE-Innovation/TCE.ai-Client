import React from "react";
import Alert from "../alert/Alert";

import Wrapper from "./style";

import { useGlobal } from "../../../hooks";

const Alerts = () => {
  const { alerts, handleRemoveAlert } = useGlobal();
  return (
    <Wrapper duration={9999}>
      <div className="alert-container">
        {alerts.map((alert) => {
          return (
            <div
              className="animation-wrapper"
              onAnimationEnd={() => handleRemoveAlert(alert.id)}
              key={alert.id}
              onClick={() => !alert.persist && handleRemoveAlert(alert.id)}
            >
              <Alert
                message={alert.message}
                type={alert.type}
                context={alert.context}
                duration={alert.duration}
                onRemove={() => handleRemoveAlert(alert.id)}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Alerts;
