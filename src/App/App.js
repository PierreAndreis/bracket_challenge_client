import React, { Component } from 'react';
import { arrayMove } from "react-sortable-hoc";
import { connect } from 'react-redux';

import GroupsPhase from "./Groups";
import MatchupPhase from "./Matchup";
import Text from "./Text";
import Agreement from "./Agreement";

import {CHANGE_STAGE} from "./../Store";

import SweetAlert from "./SweetAlert";
import swal from 'sweetalert2'

import API from "../api";

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      status: "ready",
      data: {},
    }
  }


  changeGroupOrder = (groupIndex) => ({oldIndex, newIndex}) => {
    const {changeStage, groups} = this.props;
    
    /// yuck...
    let group_clone = [...groups];

    group_clone[groupIndex] = arrayMove(group_clone[groupIndex], oldIndex, newIndex);

    return changeStage("GROUPS", group_clone);
  };

  next = (e) => {
    e.preventDefault();
    let {phase, groups, quarter, semifinal, final, _tempWin} = this.props;

    switch (phase) {
      case 0: 
      break;
      case 1: {
        // Groups -> Quarterfinals
        // 1 a vs 2 d
        // 1 c vs 2 b
        // 1 b vs 2 c
        // 1 d vs 2 a
        const [a, b, c, d] = groups;

        let newQuarters = [
          [a[0], d[1]],
          [c[0], b[1]],
          [b[0], c[1]],
          [d[0], a[1]],
        ];
        this.props.changeStage("QUARTER", newQuarters);
      break;
      }
      case 2: {
        // Quarterfinals -> Semifinals
        // a vs b
        // c vs d
        
        let newSemifinals = [
          [_tempWin[0], _tempWin[1]],
          [_tempWin[2], _tempWin[3]]
        ];
        this.props.changeStage("SEMIFINAL", newSemifinals);
      break;
      }
      case 3: {
        // Semifinal -> final
        // a vs b
        let newFinal = [
          [_tempWin[0], _tempWin[1]],
        ];
        this.props.changeStage("FINAL", newFinal);
        break;
      }
      case 4: {
        // final -> winner
        this.props.changeStage("WINNER", _tempWin[0]);
        const self = this;
        SweetAlert().then(async (data) => {
          if (!data) return;
          const {ign, email} = data;

          const answer = {groups, quarter, semifinal, final, winner: _tempWin[0]};
          if (!email || !ign || !answer) {
            return swal({
              type: "error",
              title: "Internal server error!",
              text: "Code 002. Something happened, please try again."
            })
          }

          // set loading as true, then change

          self.setState({
            status: "loading",
            data: {email, ign, answer},
          })
          self.props.incStage();


          const res = await API.sendResult(ign, email, answer);

          if (res === 1) {
            self.setState({
              status: "ready"
            })
          }
          else {
            self.setState({
              status: "error"
            })
          }

        });
        return;
      }
      default: {
        
      }

    }


    return this.props.incStage();
    

  }

  render() {

    const {phase, groups, quarter, semifinal, final, _tempWin} = this.props;

    let isDisabled = false;
    const tempWinLength = Object.keys(_tempWin).length;

    const titles = [
      {
        title: "Welcome!",
        desc: ""
      },
      {
        title: "Group Phase",
        desc: "Drag and drop the teams on the position they will be at the end of the group phase. The bottom team will be elimited."
      },
      {
        title: "Quarter Finals",
        desc: "Head-to-head phase: Pick the team that will win each match.",
      },
      {
        title: "Semi Finals",
        desc: "Head-to-head phase: Pick the team that will win each match."
      },
      {
        title: "Grand Finals",
        desc: "Head-to-head phase: Pick the team that will win each match."
      },
      {
        title: "Good luck!",
        desc: "Estimated delivery date for all rewards is January 31, 2018.",
      }
    ]

    let component = null;

    switch(phase){
      case 0: 
        isDisabled = false
        component = <Agreement />
      break;
      case 1:
        isDisabled = false;
        component = <GroupsPhase changeGroupOrder={this.changeGroupOrder} groups={groups} />
      break;
      case 2: 
        isDisabled = (tempWinLength !== quarter.length);
        component = <MatchupPhase />
      break;
      case 3: 
        isDisabled = (tempWinLength !== semifinal.length);
        component = <MatchupPhase />
      break;
      case 4: 
        isDisabled = (tempWinLength !== final.length);
        component = <MatchupPhase />
      break;
      case 5:
        isDisabled = true;
        component = <Text status={this.state.status} data={this.state.data} />
      break;
      default: 
        isDisabled = true;
      break;
  }

  


    return (
      <div>
          <h2>{titles[phase].title}</h2>
          <h4>{titles[phase].desc}</h4>
        <div className="content">
          {component}
        </div>
        <div className="buttons_app">
          {phase > 0 && phase < 5 && <button onClick={e => this.props.backStage()} className="back">Back</button>}
          {phase < 5 && <button onClick={this.next.bind(this)} disabled={isDisabled}>{phase === 0 ? "I Accept" : "Next"}</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      phase:     state.phase,
      groups:    state.groups,
      quarter:   state.quarter,
      semifinal: state.semifinal,
      final:     state.final,
      winner:    state.winner,
      _tempWin: state._tempWin,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStage: (name, teams) => dispatch(CHANGE_STAGE(name, teams)),
    incStage: () => dispatch({type: "NEXT_PHASE"}),
    backStage: () => dispatch({type: "BACK_PHASE"})
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(App);
