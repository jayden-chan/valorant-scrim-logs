import React, { useState } from "react";
import { COLORS, COL_HEADERS } from "../constants";
import { capitalize } from "../util";

import dropdown from "../images/dropdown.png";
import dropup from "../images/dropup.png";

export interface IPlayerInfoCardProps {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  gamesPlayed: number;
  gamesWon: number;
  agents: { [key: string]: number };
  totals: number[];
  averages: number[];
}

export default function PlayerInfoCard(props: IPlayerInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="player-card">
      <div className="game-header">
        <img
          className="game-dropdown"
          alt=""
          onClick={() => setIsExpanded((prev) => !prev)}
          src={isExpanded ? dropup : dropdown}
          width="24"
          height="13"
        />
        <h2 style={{ color: COLORS.GREEN }}>{props.name}</h2>
      </div>

      {isExpanded && (
        <div>
          <span>
            <h3>Top Agents</h3>
            {Object.entries(props.agents)
              .sort((a, b) => (a[1] > b[1] ? -1 : 1))
              .slice(0, 3)
              .map(([agent]) => (
                <div>{capitalize(agent)}</div>
              ))}
          </span>

          <h3>Matches</h3>
          <div>
            <span className="player-agg-stat">
              <b>Played: </b>
              {props.matchesPlayed}
            </span>
            <span>
              <b>Won: </b>
              {props.matchesWon}
            </span>
          </div>

          <h3>Games</h3>
          <div>
            <span className="player-agg-stat">
              <b>Played: </b>
              {props.gamesPlayed}
            </span>
            <span>
              <b>Won: </b>
              {props.gamesWon}
            </span>
          </div>

          <h3>Averages</h3>
          <div className="stat-row">
            {props.averages.map((val, idx) => (
              <div className="stat-item">
                <span>
                  <b>{COL_HEADERS[idx]}</b>
                </span>
                <span>{val.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <h3>Totals</h3>
          <div className="stat-row">
            {props.totals.map((val, idx) => (
              <div className="stat-item">
                <span>
                  <b>{COL_HEADERS[idx]}</b>
                </span>
                <span>{val.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
