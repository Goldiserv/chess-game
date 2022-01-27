import { CSSProperties, useMemo } from 'react'
import { Board } from './components/Board'
import { Game } from './components/Game'
//import { AppContext } from "./libs/contextLib";

export interface ChessboardTutorialAppState {
	knightPosition: [number, number]
}

const containerStyle: CSSProperties = {
	width: 500,
	height: 500,
	border: '1px solid gray',
}

function App() {
	const game = useMemo(() => new Game(), [])

  return (
		<div style={containerStyle}>
			<Board game={game} />
		</div>
  );
}

export default App;
