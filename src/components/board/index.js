import React from "react";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import BoardCrad from "./BoardCard";
import { useDispatch, useSelector } from "react-redux";
import { showModal, setMode } from "../../rtk/slices/Game";
export default function Board() {
  const dispatch = useDispatch();
  const Game = useSelector((state) => state.Game);
  const { activeUser, playMode, squares, xnext, winner, winnerLine, ties } =
    Game;

  const checkUser = (user) => {
    if (playMode === "cpu") {
      if (user === activeUser) {
        return "(you)";
      } else {
        return "(cpu)";
      }
    }
  };
  const resetGame = () => {
    dispatch(showModal());
    dispatch(setMode("start"));
  };
  return (
    <>
      {" "}
      <div className="board">
        <div className="board_header">
          <div className="x-o">
            <Xicon /> <Oicon />
          </div>

          <div className="board_turn">
            {!xnext ? (
              <Xicon color="light" size="sm" />
            ) : (
              <Oicon color="light" size="sm" />
            )}{" "}
            TURN
          </div>
          <button
            className="btn btn-sm board_restart"
            onClick={() => resetGame()}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              ata-icon="redo"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => {
                dispatch(showModal());
                dispatch(setMode("start"));
              }}
            >
              <path
                fill="currentColor"
                d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="board_body">
          {squares.map((sq, ix) => (
            <BoardCrad
              key={ix}
              index={ix}
              user={sq}
              active={winner && winnerLine && winnerLine.includes(ix)}
            />
          ))}
        </div>
        <div className="board_footer">
          <div className="card bg-blue">
            <p className="text-light">x {checkUser("x")}</p>
            <strong className="text-2xl"> {ties.x} </strong>
          </div>
          <div className="card bg-light">
            <p className="text-light">ties</p>
            <strong className="text-2xl"> {ties.x + ties.o} </strong>
          </div>
          <div className="card bg-yellow">
            <p className="text-light">o {checkUser("o")}</p>
            <strong className="text-2xl"> {ties.o}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
