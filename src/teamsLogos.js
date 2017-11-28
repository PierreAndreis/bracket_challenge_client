import ACE        from "./images/teams/ace.png";
import Cloud9     from "./images/teams/C9.svg";
import Detonation from "./images/teams/DNG.png";
import Elite8     from "./images/teams/E8.png";
import G2         from "./images/teams/G2.png";
import Impunity   from "./images/teams/Impunity.png";
import Red        from "./images/teams/RED.png";
import TSM        from "./images/teams/TSM.png";
import Tribe      from "./images/teams/Tribe.png";

// import Pain from "./images/teams/Pain.png";

import Hunters    from "./images/teams/hunters.png";
import VK         from "./images/teams/vk.png";
import Rox        from "./images/teams/rox.png";
/**
 * missing:
 * ROX,
 * Tribe
 * Ace Gaming,
 * Elite 8,
 * China TBD,
 * Impunity,
 * Hunters,
 * Cloud9
 */

const logos = {
  "Elite8": Elite8,
  "Red Canids": Red,
  // "Pain Gaming": Pain,
  "Cloud9": Cloud9,
  
  "G2 Esports": G2,
  "Team Kraken": VK,
  "Detonation": Detonation,

  "Impunity": Impunity,
  "ROX Armada": Rox,
  "Tribe": Tribe,

  "ACE Gaming": ACE,
  "Team SoloMid": TSM,
  "Hunters": Hunters
}

export default (teamName) => logos[teamName] || Cloud9;