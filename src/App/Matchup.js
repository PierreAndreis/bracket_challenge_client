import React from "react";

import { connect } from 'react-redux';
import {ADD_TEMPWIN} from "./../Store";

import teamLogo from "./../teamsLogos";

import "./Matchup.css";

const Matchup = ({teams, onClick, game, dict}) => (
  <div className="matchup">
  {teams.map((team, index) => (
    <div key={index} className={`team matchup-team ${dict === team && "picked"}`} onClick={() => onClick(game, team)}>
      <div className="team-logo">
        <div className="team-logo-logo" style={{backgroundImage: `url(${teamLogo(team)})`}} />
      </div>
      <div className="team-name">{team}</div>
    </div>
  ))}
  </div>
)

const MatchupPhase = ({phase, quarter, semifinal, final, _tempWin, addWinner}) => {

  let teams = [];
  switch (phase) {
    case 2:
      teams = quarter;
    break;
    case 3: 
      teams = semifinal;
    break;
    case 4: 
      teams = final;
    break;
    default: 
      teams = quarter;
    break;
  }

  return (
    <div className="matchups">
    {teams.map((game, index) => (
      <div className="box" key={index}>
        <h5>Match {index + 1}</h5>
        <Matchup teams={game} onClick={addWinner} game={index} dict={_tempWin[index]}/>
      </div>
      ))}
    </div>
  )

}

const mapStateToProps = state => {
  return {
      phase:     state.phase,
      quarter:   state.quarter,
      semifinal: state.semifinal,
      final:     state.final,
      winner:    state.winner,
      _tempWin:  state._tempWin,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addWinner: (game, teamName) => dispatch(ADD_TEMPWIN(game, teamName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchupPhase);