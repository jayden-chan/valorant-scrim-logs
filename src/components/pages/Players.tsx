import React from "react";
import { Link } from "react-router-dom";
import playerStats from "../../player_stats.json";
import PlayerInfoCard, { IPlayerInfoCardProps } from "../PlayerInfoCard";

export default function Players() {
  return (
    <div className="background">
      <div className="App">
        <h1>S4S Scrim Logs</h1>
        <div className="nav-links">
          <h4>
            <Link to="/">Logs Page</Link>
          </h4>
        </div>
        <div className="player-info">
          {playerStats.map((player) => {
            return (
              <PlayerInfoCard {...((player as any) as IPlayerInfoCardProps)} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
