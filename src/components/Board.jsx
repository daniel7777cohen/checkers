/* eslint-disable react/no-array-index-key */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */

import React from 'react';

const rowCount = 8;
const colCount = 8;

const Board = ({
  boardMatrix,
  playableBoard,
  selectedCoords,
  setSelectedCoords,
  handlePlayerAction,
}) => {
  const handleSquareClick = ({ actionXCoord, actionYCoord }) => {
    if (selectedCoords) {
      handlePlayerAction({ actionXCoord, actionYCoord });
    }
  };
  return (
    <div className="board">
      {[...new Array(rowCount)].map((x, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="board-row" key={rowIndex}>
          {[...new Array(colCount)].map((y, colIndex) => (
            <div
              key={colIndex}
              onClick={() =>
                handleSquareClick({
                  actionXCoord: rowIndex,
                  actionYCoord: colIndex,
                })
              }
              className={
                boardMatrix[rowIndex][colIndex] === 0
                  ? 'square square-grey'
                  : 'square square-lightBlue'
              }
            >
              {playableBoard[colIndex][rowIndex] !== null ? (
                playableBoard[colIndex][rowIndex] === 0 ? (
                  <button
                    className="btn"
                    onClick={() =>
                      setSelectedCoords({
                        selectedXCoord: rowIndex,
                        selectedYCoord: colIndex,
                      })
                    }
                    style={{ borderRadius: '50%', border: '1px solid red' }}
                    type="button"
                  >
                    <div className="player red" />
                  </button>
                ) : (
                  <button
                    className="btn"
                    onClick={() =>
                      setSelectedCoords({
                        selectedXCoord: rowIndex,
                        selectedYCoord: colIndex,
                      })
                    }
                    style={{ borderRadius: '50%', border: '1px solid white' }}
                    type="button"
                  >
                    <div className="player white" />
                  </button>
                )
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
