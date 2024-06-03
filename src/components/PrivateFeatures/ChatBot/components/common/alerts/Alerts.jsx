import React from "react";
import Alert from "../alert/Alert";

import Wrapper from "./style";

import { useAlert } from "../../../hooks";

const Alerts = () => {
  const { alerts, handleRemoveAlert } = useAlert();
  return (
    <Wrapper duration={3}>
      <div className="alert-container">
        {alerts.map((alert) => {
          return (
            <div
              className="animation-wrapper"
              onAnimationEnd={() => handleRemoveAlert(alert.id)}
              key={alert.id}
              onClick={() => handleRemoveAlert(alert.id)}
            >
              <Alert message={alert.message} type={alert.type} />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Alerts;
