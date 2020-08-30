import React from "react";
import { useState } from "react";

import breach from "../images/agents/breach.png";
import brimstone from "../images/agents/brimstone.png";
import cypher from "../images/agents/cypher.png";
import jett from "../images/agents/jett.png";
import killjoy from "../images/agents/killjoy.png";
import omen from "../images/agents/omen.png";
import phoenix from "../images/agents/phoenix.png";
import raze from "../images/agents/raze.png";
import reyna from "../images/agents/reyna.png";
import sage from "../images/agents/sage.png";
import sova from "../images/agents/sova.png";
import viper from "../images/agents/viper.png";

import dropdown from "../images/dropdown.png";
import dropup from "../images/dropup.png";

import { COL_HEADERS, TEAMMATES, COLORS } from "../constants";

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

export interface IGameItemProps {
  date: string;
  map: string;
  score: [number, number];
  time: string;
  url?: string;
  scoreboard: (string | number)[][];
}

export default function GameItem(props: IGameItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortColumn, setSortColumn] = useState(COL_HEADERS[0]);
  const [sortDirection, setSortDirection] = useState(true);
  const [sortByTeam, setSortByTeam] = useState(false);

  const mappedScoreboard = props.scoreboard.map((row) => {
    const ret = [...row];
    ret.splice(6, 0, ((row[3] as number) / (row[4] as number)).toFixed(2));
    return ret;
  });

  let sortedScoreboard = mappedScoreboard.sort((a, b) => {
    const colIdx = COL_HEADERS.indexOf(sortColumn) + 2;
    const aVal = a[colIdx];
    const bVal = b[colIdx];
    if (sortByTeam) {
      if (
        TEAMMATES.includes(a[1] as string) &&
        !TEAMMATES.includes(b[1] as string)
      ) {
        return -1;
      }
      if (
        !TEAMMATES.includes(a[1] as string) &&
        TEAMMATES.includes(b[1] as string)
      ) {
        return 1;
      }
    }

    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });

  sortedScoreboard = sortDirection
    ? sortedScoreboard
    : sortedScoreboard.reverse();

  const toggleSort = (header: string) => {
    if (sortColumn === header) {
      setSortDirection(!sortDirection);
    } else {
      setSortColumn(header);
    }
  };

  const color =
    props.score[0] > props.score[1]
      ? COLORS.GREEN
      : props.score[1] > props.score[0]
      ? COLORS.RED
      : COLORS.YELLOW;

  return (
    <div className="game-card">
      <div className="game-header">
        <img
          className="game-dropdown"
          alt=""
          onClick={() => setIsExpanded((prev) => !prev)}
          src={isExpanded ? dropup : dropdown}
          width="24"
          height="13"
        />
        <h5>
          <span className="game-card-map" style={{ color }}>
            {props.map}
          </span>
          <span>|</span>
          <span className="game-card-info">
            {props.score[0]} - {props.score[1]}
          </span>
          <span>|</span>
          <span className="game-card-info">{props.time}</span>
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
                  <th
                    onClick={() => setSortByTeam((prev) => !prev)}
                    key="Player Name"
                    className="sbd-head sbd-head-name"
                  >
                    {sortByTeam ? "Grouped by Team" : "Individually Sorted"}
                  </th>
                  {COL_HEADERS.map((header) => {
                    return (
                      <th
                        key={header}
                        onClick={() => toggleSort(header)}
                        className="sbd-head"
                      >
                        {header === sortColumn
                          ? header + (sortDirection ? " \u2191" : " \u2193")
                          : header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedScoreboard.map((row) => {
                  const image = row[0] as keyof typeof images;
                  const rowColor = TEAMMATES.includes(row[1] as string)
                    ? "sbd-team"
                    : "sbd-enemy";
                  return (
                    <tr>
                      <td className="sbd-img">
                        <img src={images[image]} alt={image} />
                      </td>
                      <td className={`sbd-cell sbd-name ${rowColor}`}>
                        <b>{row[1]}</b>
                      </td>
                      {row.slice(2).map((val, idx2) => (
                        <td
                          className={`sbd-cell sbd-num ${rowColor}`}
                          key={idx2}
                        >
                          {val}
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
