import { CSSProperties, FC, useEffect, useState } from "react";
import { BoardSquare } from "./BoardSquare";
import { Game, Position } from "./Game";
import { Piece } from "./Piece";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface BoardProps {
  game: Game;
}

/** Styling properties applied to the board element */
const boardStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexWrap: "wrap",
};
/** Styling properties applied to each square element */
const squareStyle: CSSProperties = { width: "12.5%", height: "12.5%" };

/**
 * The chessboard component
 * @param props The react props
 */
export const Board: FC<BoardProps> = ({ game }) => {
  const [[knightX, knightY], setKnightPos] = useState<Position>(
    game.knightPosition
  );
  useEffect(() => game.observe(setKnightPos));

  function renderSquare(i: number) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i} style={squareStyle}>
        <BoardSquare x={x} y={y} game={game}>
          <Piece isKnight={x === knightX && y === knightY} />
        </BoardSquare>
      </div>
    );
  }

  const squares = [];
  for (let i = 0; i < 64; i += 1) {
    squares.push(renderSquare(i));
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={boardStyle}>{squares}</div>
    </DndProvider>
  );
};
