import React from 'react';

export default function Square({ value, onSquareClick, winner }: { value: string, onSquareClick: () => void, winner: boolean }) {
  return (
    <button
      className={"square" + (winner ? " winner" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}