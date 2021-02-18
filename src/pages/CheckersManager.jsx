/* eslint-disable no-else-return */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable comma-dangle */
/* eslint-disable no-debugger */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import { initializedBoard, BoardMatrix } from '../boardUrils/board';

const validateWhitePlayerMove = (
  actionCoords,
  selectedCoords,
  playableBoard
) => {
  // x value should be -=1 or +=1 , and y shouldbe +=1
  const { actionXCoord, actionYCoord } = actionCoords;
  const { selectedXCoord, selectedYCoord } = selectedCoords;

  const isXmoveValid =
    selectedXCoord - 1 === actionXCoord || selectedXCoord + 1 === actionXCoord;
  const isYmoveValid = selectedYCoord + 1 === actionYCoord;

  return { isAttackMove: false, isActionValid: true, coordsToReset: null };
};

const validateRedPlayerMove = (actionCoords, selectedCoords, playableBoard) => {
  const { actionXCoord, actionYCoord } = actionCoords;
  const { selectedXCoord, selectedYCoord } = selectedCoords;

  // for a basic move
  // x value should be -=1 or +=1 , and y shouldbe -=1

  const isXBasicMoveValid =
    selectedXCoord - 1 === actionXCoord || selectedXCoord + 1 === actionXCoord;

  const isYBasicMoveValid = selectedYCoord - 1 === actionYCoord;
  if (isXBasicMoveValid && isYBasicMoveValid) {
    return {
      isActionValid: playableBoard[actionYCoord][actionXCoord] === null,
      isAttackMove: false,
      coordsToReset: null,
    };
  }

  // for an attack move
  // x value should be -=2 or +=2 , and y shouldbe -=2

  const isXAttackMoveValid =
    selectedXCoord - 2 === actionXCoord || selectedXCoord + 2 === actionXCoord;
  const isYAttackMoveValid = selectedYCoord - 2 === actionYCoord;

  if (isXAttackMoveValid && isYAttackMoveValid) {
    // validate there is a white player between the coords
    const eatLeftValid =
      playableBoard[actionYCoord + 1][actionXCoord + 1] === 1;
    const eatRightVald =
      playableBoard[actionYCoord + 1][actionXCoord - 1] === 1;

    if (eatLeftValid) {
      return {
        isActionValid: true,
        coordsToReset: { y: actionYCoord + 1, x: actionXCoord + 1 },
        isAttackMove: true,
      };
    } else if (eatRightVald) {
      return {
        isActionValid: true,
        coordsToReset: { y: actionYCoord + 1, x: actionXCoord - 1 },
        isAttackMove: true,
      };
    }
  }

  return isXBasicMoveValid && isYBasicMoveValid;
};

const validate = (playerTurn, actionCoords, selectedCoords, playableBoard) => {
  switch (playerTurn) {
    case 'White': {
      return validateWhitePlayerMove(
        actionCoords,
        selectedCoords,
        playableBoard
      );
    }
    case 'Red': {
      return validateRedPlayerMove(actionCoords, selectedCoords, playableBoard);
    }
    default:
      return false;
  }
};

const CheckersManager = () => {
  const [boardMatrix, setBoardMatrix] = useState(BoardMatrix);
  const [playableBoard, setPlayableBoard] = useState(initializedBoard);
  const [playerTurn, setPlayerTurn] = useState('White');
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [error, setError] = useState(null);

  const togglePlayerTurn = () => {
    setPlayerTurn((prev) => (prev === 'White' ? 'Red' : 'White'));
  };
  const handlePlayerAction = (actionCoords) => {
    // validate action is valid according to current player
    const { isActionValid, coordsToReset, isAttackMove } = validate(
      playerTurn,
      actionCoords,
      selectedCoords,
      playableBoard
    );
    if (!isActionValid) setError(`Bad move by ${playerTurn} ! `);
    else {
      if (!isAttackMove) {
        // set the playable board
        const { actionXCoord, actionYCoord } = actionCoords;
        const { selectedXCoord, selectedYCoord } = selectedCoords;
        setPlayableBoard((prev) => {
          const newBoard = [...prev];
          newBoard[selectedYCoord][selectedXCoord] = null;
          newBoard[actionYCoord][actionXCoord] = playerTurn === 'White' ? 1 : 0;
          return newBoard;
        });
      } else {
        // set the playable board
        const { actionXCoord, actionYCoord } = actionCoords;
        const { selectedXCoord, selectedYCoord } = selectedCoords;
        setPlayableBoard((prev) => {
          const newBoard = [...prev];
          newBoard[selectedYCoord][selectedXCoord] = null;
          newBoard[actionYCoord][actionXCoord] = playerTurn === 'White' ? 1 : 0;
          newBoard[coordsToReset.y][coordsToReset.x] = null;
          return newBoard;
        });
      }

      // reset and toggle
      setError(null);
      setSelectedCoords(null);
      togglePlayerTurn();
    }
  };
  useEffect(async () => {}, []);

  return (
    <>
      <div>{`${playerTurn} Turn ! ${JSON.stringify(selectedCoords)}`}</div>
      {error && <div>{error}</div>}
      <Board
        boardMatrix={boardMatrix}
        playableBoard={playableBoard}
        selectedCoords={selectedCoords}
        setSelectedCoords={setSelectedCoords}
        handlePlayerAction={handlePlayerAction}
      />
    </>
  );
};
export default CheckersManager;
