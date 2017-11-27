import { createStore } from 'redux';

const initialTeams = [
  [
    "Cloud9",
    "Elite8",
    "Red Canids"
    // "Pain Gaming"
  ],
  [
    "G2 Esports",
    "Vainglory Kraken",
    "Detonation",
  ],
  [
    "Impunity",
    "ROX Armada",
    "Tribe"
  ],
  [
    "ACE Gaming",
    "Team SoloMid",
    "Hunters"
  ]
];

const initialState = {
  phase:     0,
  groups:    initialTeams,
  quarter:   [],
  semifinal: [],
  final:     [],
  winner:    "",

  _tempWin: {},
}

function reducers(state = initialState, action) {
  switch (action.type) {

  case "NEXT_PHASE": 
    return {
      ...state, 
      _tempWin: {},
      phase: state.phase + 1,
    }

  case "BACK_PHASE":
    return {
      ...state, 
      _tempWin: {},
      phase: state.phase - 1,
    }
  case 'CHANGE_GROUPS':
    return {
      ...state,
      groups: action.payload
    }
  case 'CHANGE_QUARTER':
    return {
      ...state,
      quarter: action.payload
    }
  case 'CHANGE_SEMIFINAL':
    return {
      ...state,
      semifinal: action.payload,
    }
  
  case 'CHANGE_WINNER':
    return {
      ...state,
      winner: action.payload,
    }

  case 'CHANGE_FINAL':
    return {
      ...state,
      final: action.payload,
    }

  case 'TEMP_WIN': 
    return {
      ...state,
      _tempWin: action.payload,
    }

  default:
    return state
  }
}

let store = createStore(reducers);


// store.subscribe(() =>
//   // console.log("REDUX", JSON.stringify(store.getState(), null, 2))
// )


// ===== ACTIONS ======

export const ADD_TEMPWIN = (match, winner) => {

  const {_tempWin} = store.getState();
  const cloneTemp = {..._tempWin};
  cloneTemp[match] = winner;


  return {
    type: "TEMP_WIN",
    payload: cloneTemp,
  }
}

export const CHANGE_STAGE = (stage, teams) => {
  // yuck... cmon... at least verify if the stage exists!
  return {
    type:    `CHANGE_${stage}`,
    payload: teams,
  }
}

export default store;