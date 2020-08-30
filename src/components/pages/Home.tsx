import React from "react";
import MatchItem from "../MatchListItem";
import {
  matches,
  matchesPlayed,
  matchesWon,
  gamesPlayed,
  gamesWon,
} from "../../matches.json";
import { IGameItemProps } from "../GameItem";

import moment from "moment";
import { Link } from "react-router-dom";

const totalTimeSpent = matches.reduce((a1, c1) => {
  const matchDuration = c1.games.reduce((a2, c2) => {
    a2.add(Number(c2.time.slice(3)), "seconds");
    a2.add(Number(c2.time.slice(0, 2)), "minutes");
    return a2;
  }, moment.duration(0));
  a1.add(matchDuration);
  return a1;
}, moment.duration(0));

export default function Home() {
  return (
    <div className="background">
      <div className="App">
        <h1>S4S Scrim Logs</h1>
        <div className="nav-links">
          <h4>
            <Link to="/players">Player Stats</Link>
          </h4>
        </div>

        <div className="info-header">
          <div className="info-header-item">
            <span>
              <b>Time Played:</b> {totalTimeSpent.hours()}:
              {totalTimeSpent.minutes()}:
              {`${totalTimeSpent.seconds()}`.padStart(2, "0")}
            </span>
          </div>
          <div className="info-header-item">
            <span>
              <b>Matches played:</b> {matchesPlayed}
            </span>
            <span>
              <b>Matches won:</b> {matchesWon}
            </span>
            <span>
              <b>Match Winrate:</b>{" "}
              {((matchesWon / matchesPlayed) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="info-header-item">
            <span>
              <b>Games played:</b> {gamesPlayed}
            </span>
            <span>
              <b>Games won:</b> {gamesWon}
            </span>
            <span>
              <b>Game Winrate:</b> {((gamesWon / gamesPlayed) * 100).toFixed(1)}
              %
            </span>
          </div>
        </div>

        {matches.map(({ games, date, score, result }, idx) => (
          <MatchItem
            games={games as IGameItemProps[]}
            date={date}
            key={idx}
            score={score as [number, number]}
            result={result}
          />
        ))}
      </div>
    </div>
  );
}
