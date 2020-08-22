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
  scoreboard: string[][];
}

export default function GameItem(props: IGameItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortColumn, setSortColumn] = useState(COL_HEADERS[0]);
  const [sortDirection, setSortDirection] = useState(true);
  const [sortByTeam, setSortByTeam] = useState(false);

  const mappedScoreboard = props.scoreboard.map((row) => {
    const ret = [...row];
    ret.splice(6, 0, (Number(row[3]) / Number(row[4])).toFixed(2));
    return ret;
  });

  let sortedScoreboard = mappedScoreboard.sort((a, b) => {
    const colIdx = COL_HEADERS.indexOf(sortColumn) + 2;
    const aVal = Number(a[colIdx]);
    const bVal = Number(b[colIdx]);
    if (sortByTeam) {
      if (TEAMMATES.includes(a[1]) && !TEAMMATES.includes(b[1])) {
        return -1;
      }
      if (!TEAMMATES.includes(a[1]) && TEAMMATES.includes(b[1])) {
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
                  <th
                    onClick={() => setSortByTeam((prev) => !prev)}
                    key="Player Name"
                    className="sbd-head"
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
