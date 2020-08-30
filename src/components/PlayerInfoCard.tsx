import React from "react";
import { COL_HEADERS } from "../constants";

export interface IPlayerInfoCardProps {
  name: string;
  matchesPlayed: number;
  matchesWon: number;
  gamesPlayed: number;
  gamesWon: number;
  totals: number[];
  averages: number[];
}

export default function PlayerInfoCard(props: IPlayerInfoCardProps) {
  return (
    <div className="player-card">
      <h2>{props.name}</h2>

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
  );
}
