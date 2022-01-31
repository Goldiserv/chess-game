import { CSSProperties, useMemo } from 'react'
import { Board } from './Board'
import { Game } from './Game'

// export interface ChessboardTutorialAppState {
// 	knightPosition: [number, number]
// }

const containerStyle: CSSProperties = {
	width: 400,
	height: 400,
	border: '1px solid gray',
}

function Chess() {
	const game = useMemo(() => new Game(), [])

  return (
		<div style={containerStyle}>
			<Board game={game} />
		</div>
  );
}

export default Chess;