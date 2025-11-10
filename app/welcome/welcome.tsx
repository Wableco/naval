import React, { useState, useEffect } from "react";

export function BattleShipGame() {
  const [shipPosition, setShipPosition] = useState<[number, number]>([0, 0]);
  const [board, setBoard] = useState<string[][]>(Array(5).fill(null).map(() => Array(5).fill("~")));
  const [message, setMessage] = useState("");
  const [endGame, setEndGame] = useState(false)
  const generateShipPosition = () => {
    const x = Math.floor(Math.random() * 5);
    const y = Math.floor(Math.random() * 5);
    setShipPosition([x, y]);
  };
  
  console.log(shipPosition)
  console.log(board)
  console.log(message)
  
  useEffect(() => {
    generateShipPosition();
  }, []);

  const handleClick = (row: number, col: number) => {
    if(!endGame){
      if (row === shipPosition[0] && col === shipPosition[1]) {
        setMessage("Acertou o navio! Clique em Reset para jogar novamente");
        updateBoard(row, col, "O");
        setEndGame(true)
      } else {
        setMessage("Errou! Tente novamente.");
        updateBoard(row, col, "X");
      }
    }
  };

  const updateBoard = (row: number, col: number, symbol: string) => {
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = symbol;
      return newBoard;
    });
  };

  const resetGame = () => {
    setBoard(Array(5).fill(null).map(() => Array(5).fill("~")));
    setMessage("");
    setEndGame(false)
    generateShipPosition();
  };

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h2 className="mb-4 text-xl font-bold">Jogo de Batalha Naval</h2>
      <div className="grid grid-cols-5 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="w-12 h-12 bg-blue-200 hover:bg-blue-400 text-lg font-bold"
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={cell !== "~"}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <p className="mt-4 text-lg">{message}</p>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >Reset</button>
    </main>
  );
}