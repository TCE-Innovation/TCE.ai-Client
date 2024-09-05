import React, { useMemo } from "react";

import Wrapper from "./style";

import { TabContext } from "../../../common";

import Navigator from "../Navigator";

import { useGlobal } from "../../../../hooks";

import { PROFILES } from "../../../../constants/admin";

import TeamList from "./TeamList";
import Team from "./Team";

const Teams = () => {
  const { query } = useGlobal();
  const { push, params } = query;

  const { team_id } = params;

  const tabs = useMemo(
    () => [
      {
        title: "Team list",
        value: PROFILES.TEAMS,
        handleClick: () => {
          push({ team_id }, { reverse: true });
        },
        pane: TeamList,
      },
      {
        title: team_id,
        value: PROFILES.TEAM_USERS,
        pane: Team,
      },
    ],
    // eslint-disable-next-line
    [team_id]
  );

  return (
    <Wrapper>
      <TabContext defaultActive={team_id ? 1 : 0} tabs={tabs}>
        <div>
          <Navigator />
        </div>
        <div>
          <TabContext.Panes>
            {tabs.map((tab, i) => {
              const Component = tab.pane;
              return (
                <TabContext.Provider key={i}>
                  {({ activeTab }) => {
                    if (i !== activeTab) return null;
                    return <Component />;
                  }}
                </TabContext.Provider>
              );
            })}
          </TabContext.Panes>
        </div>
      </TabContext>
    </Wrapper>
  );
};

export default Teams;
