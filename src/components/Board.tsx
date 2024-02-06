import React from "react";
import Square from "./Square.tsx";

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status = '';
  status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`; 

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares))
      return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  function square(i) {
    return (
      <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
    );
  }

  function row(i) {
    return (
      <div className="board-row">
        {square(3*i)}
        {square(3*i + 1)}
        {square(3*i + 2)}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {row(0)}
      {row(1)}
      {row(2)}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
