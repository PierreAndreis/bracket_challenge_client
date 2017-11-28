import React from "react";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

import teamLogo from "./../teamsLogos";

import "./Groups.css";

const Team = SortableElement(({team}) => {
  return (
  <div key={team} className="team">
    <div className="team-logo">
      <div className="team-logo-logo" style={{backgroundImage: `url(${teamLogo(team)})`}} />
    </div>
    <div className="team-name">{team}</div>
    <div className="team-drag" />
  </div>
  );
});

const TeamsGroup = SortableContainer(({group, groupName}) => {

  const groupLetter = ["A", "B", "C", "D"]

  return (
  <div className="group box">
    <h5>Group {groupLetter[groupName]}</h5>
    <br />
      {group.map((team, index) => <Team index={index} key={team} team={team} />)}
    </div>
  );
});

const GroupsPhase = ({changeGroupOrder, groups}) => {
  return groups.map((group, index) => (
    <TeamsGroup key={index} 
                group={group} 
                groupName={index} 
                lockAxis={"y"} 
                onSortEnd={changeGroupOrder(index)}
                />
  ));
}

export default GroupsPhase;