import React from "react";
import Square from "./Square.tsx";

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)?.winner;
  const winnerFields = calculateWinner(squares)?.winnerFields ?? [];
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

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((i) => { 
        return (
          <div key={i} className="board-row">
            {[0, 1, 2].map((j) => { 
              return (
                <Square
                  key={3*i+j}
                  winner={winnerFields.includes(3 * i + j)}
                  value={squares[3 * i + j]}
                  onSquareClick={() => handleClick(3 * i + j)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function calculateWinner(squares): { winner: string, winnerFields: number[] } | null {
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
      return { winner: squares[a], winnerFields: lines[i] };
    }
  }
  return null;
}
