import React from "react";
import { useState } from "react";

import breach from "../agents/breach.png";
import brimstone from "../agents/brimstone.png";
import cypher from "../agents/cypher.png";
import jett from "../agents/jett.png";
import killjoy from "../agents/killjoy.png";
import omen from "../agents/omen.png";
import phoenix from "../agents/phoenix.png";
import raze from "../agents/raze.png";
import reyna from "../agents/reyna.png";
import sage from "../agents/sage.png";
import sova from "../agents/sova.png";
import viper from "../agents/viper.png";

import dropdown from "../images/dropdown.png";
import dropup from "../images/dropup.png";

const images = {
  breach,
  brimstone,
  cypher,
  jett,
  killjoy,
  omen,
  phoenix,
  raze,
  reyna,
  sage,
  sova,
  viper,
};

const TEAMMATES = [
  "ATQMIC",
  "LithiumFrost",
  "Eung Coconut",
  "Wild West",
  "HonestPretzels",
  "Pax1",
  "Jakyb",
  "Mugi",
];

const COL_HEADERS = [
  "Avg Combat Score",
  "K",
  "D",
  "A",
  "K/D Ratio",
  "Econ Rating",
  "First Bloods",
  "Plants",
  "Defuses",
];

export interface IGameItemProps {
  date: string;
  map: string;
  score: [number, number];
  time: string;
  url?: string;
  scoreboard: string[][];
}

function GameItem(props: IGameItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortColumn, setSortColumn] = useState(COL_HEADERS[0]);
  const [sortDirection, setSortDirection] = useState(true);

  const mappedScoreboard = props.scoreboard.map((row) => {
    const ret = [...row];
    const k = Number(row[3]);
    const d = Number(row[4]);
    const kd = (k / d).toFixed(2);
    ret.splice(6, 0, kd);
    return ret;
  });

  let sortedScoreboard = mappedScoreboard.sort((a, b) => {
    const colIdx = COL_HEADERS.indexOf(sortColumn) + 2;
    const aVal = Number(a[colIdx]);
    const bVal = Number(b[colIdx]);
    if (aVal > bVal) {
      return -1;
    }
    if (aVal < bVal) {
      return 1;
    }
    return 0
  });

  sortedScoreboard = sortDirection ? sortedScoreboard : sortedScoreboard.reverse();

  const toggleSort = (header: string) => {
    if (sortColumn === header) {
      setSortDirection(!sortDirection);
    } else {
      setSortDirection(true);
      setSortColumn(header);
    }
  }
  
  const color =
    props.score[0] > props.score[1]
      ? "#9bff87"
      : props.score[1] > props.score[0]
      ? "#ff5454"
      : "yellow";

  return (
    <div className="game-card">
      <div className="game-header">
        {isExpanded ? (
          <img
            className="game-dropdown"
            alt=""
            onClick={() => setIsExpanded((prev) => !prev)}
            src={dropup}
            width="24"
            height="13"
          />
        ) : (
          <img
            className="game-dropdown"
            alt=""
            onClick={() => setIsExpanded((prev) => !prev)}
            src={dropdown}
            width="24"
            height="13"
          />
        )}
        <h5>
          <span style={{ color }}>{props.map}</span>
          <span>|</span>
          <span>{props.time}</span>
          <span>|</span>
          <span>
            {props.score[0]} - {props.score[1]}
          </span>
        </h5>
      </div>
      {isExpanded && (
        <div>
          {props.url ? (
            <p className="vod">
              <a target="_blank" rel="noopener noreferrer" href={props.url}>
                {props.url}
              </a>
            </p>
          ) : (
            <p className="vod">No VOD available</p>
          )}
          <div className="sbd-container">
            <table
              id={`${props.date}${props.map}${props.time}`}
              className="sbd"
            >
              <thead>
                <tr>
                  <th key="Icon" className="sbd-head"></th>
                  <th key="Player Name" className="sbd-head">
                    Player Name
                  </th>
                  {COL_HEADERS.map((header) => {
                    return (
                      <th key={header} onClick={() => toggleSort(header)} className="sbd-head">
                        {header}
                        {header === sortColumn ? (
                          <img className="sort-dropdown"
                            alt=""
                            src={sortDirection ? dropup : dropdown}
                            width="12"
                            height="7"
                          />
                        ): null}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedScoreboard.map((row) => {
                  const image = row[0] as keyof typeof images;
                  return (
                    <tr>
                      <td className="sbd-img">
                        <img src={images[image]} alt={image} />
                      </td>
                      {row.slice(1).map((val, idx2) => (
                        <td
                          className={`sbd-cell ${
                            idx2 === 0 ? "sbd-name" : "sbd-num"
                          } ${
                            TEAMMATES.includes(row[1])
                              ? "sbd-team"
                              : "sbd-enemy"
                          }`}
                          key={idx2}
                        >
                          {idx2 === 0 ? <b>{val}</b> : val}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export interface IMatchItemProps {
  games: IGameItemProps[];
}

export default function MatchItem(props: IMatchItemProps) {
  const score = props.games.reduce(
    (score, curr) => {
      if (curr.score[0] > curr.score[1]) {
        score[0] += 1;
      } else if (curr.score[1] > curr.score[0]) {
        score[1] += 1;
      } else {
        score[0] += 0.5;
        score[1] += 0.5;
      }

      return score;
    },
    [0, 0]
  );

  const color =
    score[0] > score[1]
      ? "#9bff87"
      : score[1] > score[0]
      ? "#ff5454"
      : "yellow";
  const result =
    score[0] > score[1] ? "VICTORY" : score[1] > score[0] ? "DEFEAT" : "DRAW";

  return (
    <div className="match-card">
      <h4>
        <span>{props.games[0].date}</span>
        <span>-</span>
        <span style={{ color }}>{result}</span>
        <span>
          {score[0]} - {score[1]}
        </span>
      </h4>
      {props.games.map((game, idx) => {
        return <GameItem {...game} key={idx} />;
      })}
    </div>
  );
}
