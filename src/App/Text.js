import React from "react";
import "./Text.css";

const URL = "https://bracket_api.vgpro.gg"

export default ({data, status}) => {
  if (status !== "ready") { return <p>Loading...</p> }

  const urlTwitter = `${URL}/${data.ign}/connect`;
  const urlBracket = `${URL}/${data.ign}/bracket.jpg`;

  return (
    <div className="box">
    <p>Hey {data.ign}, <br />
    Thank you for participating in the VGPRO.gg Worlds 2017 challenge. </p>
    <p>Don't forget to tune-in on December 14 to 17 on <a href="https://twitch.tv/vainglory" target="_blank" rel="noopener noreferrer">twitch.tv/vainglory</a> to watch the World Championship! </p>
    <p className="buttons">
      <a href={urlTwitter} target="_blank" rel="noopener noreferrer">
        <button className="twitter">Share on Twitter</button>
      </a>
      <a href={urlBracket} target="_blank" download rel="noopener noreferrer">
        <button className="download">Download your bracket</button>
      </a>
      <a href={urlBracket} target="_blank" download rel="noopener noreferrer">
        <button className="vgpro">Check your Vainglory Stats</button>
      </a>
    </p>
    <img src={urlBracket} width="800" height="420" className="no-mobile" alt="Bracket Challenge"/>
    </div>
  )
}
